import Ember from 'ember';

export default Ember.Component.extend({
  socket: Ember.inject.service(),
  store: Ember.inject.service(),
  channel: null,
  songs: null,
  search: null,
  searching: false,

  didInsertElement() {
    this.get('socket').connect();

    const serverName = this.get('model.server.name');
    const channel = this.get('socket').channel('unicorn:' + serverName);

    this.set('channel', channel);

    this.get('channel').join();

    this.get('channel').push('new_device', {});
  },

  actions: {
    pushNewSound(song) {
      console.log(song);
      this.get('channel').push('new_song', {
        id: song.get('id'),
        title: song.get('title'),
        thumbnail: song.get('thumbnail')
      });
    },

    searchSong() {
      let search = this.get('search');

      this.set('searching', true);

      this.get('store').query('song', {query: search}).then((response) => {
        this.set('searching', false);
        this.set('songs', response)
      });
    }
  }
});
