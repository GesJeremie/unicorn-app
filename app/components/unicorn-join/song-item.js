import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * The song item
   */
  song: null,

  /**
   * Setup the component
   */
  didInsertElement() {
    this.setupDefaultPushButtonLabel();
  },

  /**
   * Set a label to the push button
   */
  setupDefaultPushButtonLabel() {
    this.set('song.pushButtonLabel', 'Push Song');
  },

  actions: {

    /**
     * Push song clicked, call the handler given
     * @param {Object} song
     */
    onClickPushSong(song) {
      this.get('onPushSong')(song);
    }
  }
});
