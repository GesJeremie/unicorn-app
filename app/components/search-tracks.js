import Ember from 'ember';

export default Ember.Component.extend({
  socket: Ember.inject.service(),
  store: Ember.inject.service(),
  songs: null,
  search: null,
  searching: false,

  didInsertElement() {
  },

  actions: {
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
