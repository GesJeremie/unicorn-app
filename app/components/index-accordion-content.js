import Ember from 'ember';

export default Ember.Component.extend({

  isShown: false,
  classOpened: '',

  mediaSmallChanged: Ember.observer('media.isSmall', 'media.isMedium', function() {
    this.setupIsShown();
  }),

  updateClassOpened: Ember.observer('isShown', 'media.isSmall', 'media.isMedium', function() {

    if (!this.get('media.isSmall') && !this.get('media.isMedium')) {
      this.set('classOpened', '');
      return;
    }

    if (this.get('isShown')) {
      this.set('classOpened', 'home-faq__question--opened');
      return;
    }

    if (!this.get('isShown')) {
      this.set('classOpened', 'home-faq__question--closed');
      return;
    }
  }),

  didInsertElement() {
    this.setupIsShown();
  },

  setupIsShown() {
    if (this.get('media.isSmall') || this.get('media.isMedium')) {
      this.set('isShown', false);
      return;
    }

    this.set('isShown', true);
  },

  actions: {
    onClickTitle() {
      if (!this.get('media.isSmall') && !this.get('media.isMedium')) {
        return;
      }

      this.toggleProperty('isShown');
    }
  }
});
