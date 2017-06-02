import Ember from 'ember';

export default Ember.Component.extend({
  socket: Ember.inject.service(),
  channel: null,
  tracks: null,

  didInsertElement() {
    this.get('socket').connect();

    const serverName = this.get('model.server.name');
    const channel = this.get('socket').channel('unicorn:' + serverName);

    this.set('channel', channel);

    this.get('channel').join();

    this.get('channel').push('new_device', {});
  },

  actions: {
    pushNewSound() {
      this.get('channel').push('new_song', {title: "Simple test"});
    },

    searchSong() {
      let search = this.get('search'),
          key = 'AIzaSyB7T2tSvrpH_L-GF2wzu62e2sfezISNw_k';

      Ember.$.get('https://www.googleapis.com/youtube/v3/search', {part: 'snippet', q: search, key: key, type: 'video'}).then((response) => {
        this.set('tracks', response.items);
      });

    }
  }
});
