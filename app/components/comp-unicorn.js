import Ember from 'ember';

export default Ember.Component.extend({
  socket: Ember.inject.service(),

  isFirstSetup: true,
  isStepJoinCompleted: false,
  isStepPushCompleted: false,

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
    if (this.get('isFirstSetup') && !this.get('isStepPushCompleted')) {
      this.set('isStepPushCompleted', true);

      this.set('player', this.setupPlayer());
    }

    this.play(song);
  },

  onNewDevice(payload) {
    if (this.get('isFirstSetup') && !this.get('isStepJoinCompleted')) {
      this.set('isStepJoinCompleted', true);
    }
  },

  setupPlayer() {
    return plyr.setup('#player', {
      autoplay: true,
      volume: 10,
      hideControls: false,
    })[0];
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
