import Ember from 'ember';

export default Ember.Component.extend({
  socket: Ember.inject.service(),

  isFirstSetup: true,
  isStepJoinCompleted: false,
  isStepPushCompleted: false,

  didInsertElement() {
    this.get('socket').connect();
    const channel = this.get('socket').joinChannel('room:lobby');

    console.log(channel);

    channel.on('new_song', (payload) => {
      console.log('new song to play');
    })

    channel.join().
      receive("ok", () => {
        // Set status "not live" to "live"
        console.log('awesome');
      })
      .receive("error", () => {
        console.log('problem to join the channel');
      });

  }
});
