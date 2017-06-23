import Ember from 'ember';

export default Ember.Component.extend({

  isShown: false,

  mediaSmallChanged: Ember.observer('media.isSmall', function() {
    console.log('media changed');
    if (this.get('media.isSmall')) {
      this.set('isShown', false);
      return;
    }

    this.set('isShown', true);
  }),

  didInsertElement() {
  },

  actions: {
    onClickTitle() {
      if (!this.get('media.isSmall')) {
        return;
      }

      this.toggleProperty('isShown');
    }
  }
});
