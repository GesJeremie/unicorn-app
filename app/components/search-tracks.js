import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  search: null,
  searching: false,
  songs: null,

  didInsertElement() {},

  actions: {
    searchSong() {
      let search = this.get('search');

      this.set('searching', true);

      this.get('store').query('song', {query: search})
      .then((response) => {
        this.set('searching', false);
        this.set('songs', response)
      })
      .catch((error) => {
        this.set('searching', false);
      });
    }
  }
});
