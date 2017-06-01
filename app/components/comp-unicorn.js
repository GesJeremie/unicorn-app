import Ember from 'ember';

export default Ember.Component.extend({
  socket: Ember.inject.service(),

  isFirstSetup: true,
  isStepJoinCompleted: false,
  isStepPushCompleted: false,

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

    /*
    channel.join().
      receive("ok", () => {
        // Set status "not live" to "live"
        console.log('awesome');
      })
      .receive("error", () => {
        console.log('problem to join the channel');
      });
    */
  },

  onNewSong(payload) {
    if (this.get('isFirstSetup') && !this.get('isStepPushCompleted')) {
      this.set('isStepPushCompleted', true);
    }
  },

  onNewDevice(payload) {
    if (this.get('isFirstSetup') && !this.get('isStepJoinCompleted')) {
      this.set('isStepJoinCompleted', true);
    }
  }
});
