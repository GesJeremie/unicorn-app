import Ember from 'ember';

export default Ember.Component.extend({
  target: null,

  didInsertElement() {
    let target = this.get('target'),
        media = this.get('media');

    if (media.get('isSmall') || media.get('isMedium')) {
      return;
    }

    this.$(target).focus();
  }
});
