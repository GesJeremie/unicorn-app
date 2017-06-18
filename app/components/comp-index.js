import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  currentUnicornToJoin: null,
  unicornToJoin: '',
  unicornToJoinExists: false,

  unicornToJoinChanged: Ember.observer('unicornToJoin', function() {
    this.set('unicornToJoin', this.get('unicornToJoin').trim());
    Ember.run.debounce(this, this.onChangeUnicornToJoin, 500);
  }),

  actions: {
    onClickTriggerJoinUnicorn() {
      $('.js-join-unicorn').focus();
    }
  },

  didInsertElement() {
    this.setupModalJoin();
  },

  setupModalJoin() {
    $('#trigger-join-unicorn').animatedModal({
      animatedIn: 'bounceInUp',
      animatedOut: 'bounceOutDown',
      color: '#F5F7F9'
    });
  },

  onChangeUnicornToJoin: function() {
    let unicornToJoin = this.get('unicornToJoin');

    if (!unicornToJoin) {
      this.set('unicornToJoinExists', false);
      return;
    }

    this.get('store').findRecord('server', unicornToJoin)
    .then((server) => {
      this.set('currentUnicornToJoin', server);
      this.set('unicornToJoinExists', true);
    })
    .catch((response) => {
      this.set('unicornToJoinExists', false);
    });
  }
});
