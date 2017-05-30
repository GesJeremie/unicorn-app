import Ember from 'ember';

export default Ember.Component.extend({
  socket: Ember.inject.service(),
  channel: null,

  didInsertElement() {
    this.get('socket').connect();
    const channel = this.get('socket').channel('room:lobby');
    this.set('channel', channel);

    this.get('channel').join();

    this.get('channel').push('new_device', {});
  },

  actions: {
    pushNewSound() {
      this.get('channel').push('new_song', {title: "Simple test"});
    }
  }
});
