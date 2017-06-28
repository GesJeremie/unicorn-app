import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    token: ''
  },

  model(params) {
    return Ember.RSVP.hash({
      server: this.get('store').findRecord('server', params.unicorn_name)
    });
  },

  afterModel(model, transition) {
    if (transition.queryParams.token !== model.server.get('token')) {
      this.transitionTo('index');
    }
  }
});
