import Ember from 'ember';

export default Ember.Controller.extend({

  /**
   * Unicorn found
   * @type {Ember.Object}
   */
  unicorn: null,

  /**
   * The unicorn to search
   * @type {String}
   */
  unicornSearch: '',

  /**
   * Flag to check if the unicorn exists
   * @type {Boolean}
   */
  unicornExists: Ember.computed.notEmpty('unicorn'),

  /**
   * Sanetize the search given to accept inputs like:
   * - "serious-snail-350"
   * - "serious snail 350"
   * - "Serious snail 350"
   * - "  Serious snail 350  "
   * @return {String}
   */
  unicornSearchClean: Ember.computed('unicornSearch', function() {
    return this.get('unicornSearch').trim().split(' ').join('-').toLowerCase();
  }),

  /**
   * When the search is updated, we try to find the unicorn given
   * from the backend.
   */
  unicornSearchChanged: Ember.observer('unicornSearch', function() {
    let search = this.get('unicornSearchClean');

    if (!search) {
      this.set('unicorn', null);
      return;
    }

    this.get('store').findRecord('server', search)
    .then((server) => {
      this.set('unicorn', server);
    })
    .catch((response) => {
      this.set('unicorn', null);
    });
  })

});
