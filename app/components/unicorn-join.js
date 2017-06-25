import Ember from 'ember';

export default Ember.Component.extend({
  socket: Ember.inject.service(),
  store: Ember.inject.service(),
  channel: null,

  didInsertElement() {
    this.get('socket').connect();

    const serverName = this.get('model.server.name');
    const channel = this.get('socket').channel('unicorn:' + serverName);

    this.set('channel', channel);

    this.get('channel').join();

    this.get('channel').push('new_device', {});
  },

  actions: {
    pushSong(song) {
      this.get('channel').push('new_song', {
        id: song.get('id'),
        title: song.get('title'),
        thumbnail: song.get('thumbnail')
      });
    }
  }
});
