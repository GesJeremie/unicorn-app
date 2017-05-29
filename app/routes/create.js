import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').createRecord('server').save();
  },

  afterModel(model, transition) {
    this.transitionTo('unicorn', model.get('name'), {queryParams: {
      token: model.get('token')
    }});
  }
});
