import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
    this.set('song.pushButtonLabel', 'Push Song');
  },

  actions: {
    onClickPushSong(song) {
      this.get('onPushSong')(song);
    }
  }
});
