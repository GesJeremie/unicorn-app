import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      server: this.get('store').findRecord('server', params.unicorn_name)
    });
  },
  actions: {
    error(error, transition) {
      this.replaceWith('index');
    }
  }
});
