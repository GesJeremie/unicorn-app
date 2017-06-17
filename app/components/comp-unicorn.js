import Ember from 'ember';

export default Ember.Component.extend({
  socket: Ember.inject.service(),

  isSetupJoinCompleted: false,
  isSetupPushCompleted: false,
  isSetupFinished: false,

  song: null,
  hasCurrentSong: Ember.computed.notEmpty('song'),

  player: null,

  didInsertElement() {
    this.get('socket').connect();

    const channel = this.get('socket').channel('unicorn:' + this.get('model.server.name'));

    /**
     * Register listeners
     */
    channel.on('new_device', (payload) => {
      this.onNewDevice(payload)
    });

    channel.on('new_song', (payload) => {
      this.onNewSong(payload);
    });

    channel.join();
  },

  onNewSong(song) {
    if (!this.get('isSetupFinished')) {
      this.set('isStepPushCompleted', true);
      this.set('isSetupFinished', true);
      this.setupPlayer();
    }

    this.set('song', song);

    this.play(song);
  },

  onNewDevice(payload) {
    if (!this.get('isSetupFinished')) {
      this.set('isStepJoinCompleted', true);
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
