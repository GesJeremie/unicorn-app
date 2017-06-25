import Ember from 'ember';

export default Ember.Component.extend({

  interval: null,
  loadingText: 'Loading ...',

  didInsertElement() {
    let interval = setInterval(this.updateLoadingText.bind(this), 1000);
    this.set('interval', interval);
  },

  willDestroyElement() {
    clearInterval(this.get('interval'));
  },

  updateLoadingText() {
    const loadingText = this.get('loadingText');

    // Could be improved ...
    if (loadingText === 'Loading .') {
      this.set('loadingText', 'Loading ..');
      return;
    }

    if (loadingText === 'Loading ..')  {
      this.set('loadingText', 'Loading ...');
      return;
    }

    if (loadingText === 'Loading ...') {
      this.set('loadingText', 'Loading .');
      return;
    }
  }
});
