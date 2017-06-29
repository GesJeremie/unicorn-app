import Ember from 'ember';

export default Ember.Component.extend({
  socket: Ember.inject.service(),

  isStepJoinCompleted: false,
  isStepPushCompleted: false,
  isSetupFinished: Ember.computed.and('isStepJoinCompleted', 'isStepPushCompleted'),

  song: null,
  hasCurrentSong: Ember.computed.notEmpty('song'),

  player: null,

  channel: null,

  didInsertElement() {
    this.setupSocket();
    this.setupChannel();
    this.setupChannelEvents();
    this.setupKeyboardEvents();
  },

  setupSocket() {
    this.get('socket').connect();
  },

  setupChannel() {
    const channel = this.get('socket').channel('unicorn:' + this.get('model.server.name'));

    channel.join()
    this.set('channel', channel);
  },

  setupChannelEvents() {
    this.get('channel').on('new_device', this.onChannelNewDevice.bind(this));
    this.get('channel').on('new_song', this.onChannelNewSong.bind(this));
  },

  setupKeyboardEvents() {
    $(document).on('keypress', this.onKeyPressDocument.bind(this));
  },

  onChannelNewSong(song) {
    if (!this.get('isSetupFinished')) {
      this.set('isStepPushCompleted', true);
      this.setupPlayer();
    }

    this.set('song', song);

    this.play(song);
  },

  onChannelNewDevice(payload) {
    if (!this.get('isSetupFinished')) {
      this.set('isStepJoinCompleted', true);
    }
  },

  onKeyPressDocument(e) {
    const spacebar = 32,
          keyPressed = e.which;

    if (keyPressed == spacebar) {
      this.onSpaceBarPressed();
    }
  },

  onSpaceBarPressed() {
    if (!this.get('hasCurrentSong')) {
      return;
    }

    if (this.get('player').isPaused()) {
      this.get('player').play();
    } else {
      this.get('player').pause();
    }
  },

  setupPlayer() {
    let player = plyr.setup('#player', {
      autoplay: true,
      volume: 10,
      hideControls: true,
    })[0];

    this.set('player', player);

    this.get('player').on('timeupdate', (event) => {
      let currentTime = moment().startOf('day').seconds(event.detail.plyr.getCurrentTime()).format('mm:ss');
      let durationTime = moment().startOf('day').seconds(event.detail.plyr.getDuration()).format('mm:ss')
      this.set('song.currentTime', currentTime);
      this.set('song.durationTime', durationTime);
    });

  },

  play(song) {
    this.get('player').source({
      type: 'video',
      title: song.title,
      sources: [{
        src: song.id,
        type: 'youtube'
      }]
    });
  }
});
