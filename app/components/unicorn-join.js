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

    this.get('channel').on('new_song', (payload) => {
      this.set('currentSong', payload);
    });
  },

  actions: {
    onPushSong(song) {

      song.set('pushButtonLabel', 'Pushing ...');

      this.get('channel').push('new_song', {
        id: song.get('id'),
        title: song.get('title'),
        thumbnail: song.get('thumbnail')
      }).receive('ok', (reply) => {
        song.set('pushButtonLabel', 'Push Song');
      });

    }
  }
});
