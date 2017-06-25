import Ember from 'ember';

export default Ember.Component.extend({
  target: null,

  didInsertElement() {
    let target = this.get('target');
    this.$(target).focus();
  }
});
