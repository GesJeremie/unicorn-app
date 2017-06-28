import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * Services
   */
  store: Ember.inject.service(),

  /**
   * The current search
   */
  search: '',

  /**
   * Check if a search is performing
   */
  isSearching: false,

  /**
   * Songs retrieved from the search
   */
  songs: null,

  didInsertElement() {},

  actions: {

    /**
     * Search the song for the search given
     */
    searchSong() {
      let search = this.get('search');

      this.set('isSearching', true);

      this.get('store').query('song', {query: search})
      .then((response) => {
        this.set('isSearching', false);
        this.set('songs', response)
      })
      .catch((error) => {
        this.set('isSearching', false);
      });
    }
  }
});
