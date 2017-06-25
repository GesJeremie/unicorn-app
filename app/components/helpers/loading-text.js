import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * Store interval to clear when we remove
   * the component
   */
  interval: null,

  /**
   * The text input given by the developer
   * @type {String}
   */
  text: 'Loading',

  /**
   * The final string to render in the component
   * @type {String}
   */
  loadingText: '',

  /**
   * Flag to know how much dots are
   * stored currently
   * @type {Number}
   */
  dots: 0,

  /**
   * Maximum dots to display
   * @type {Number}
   */
   maximumDots: 3,

   /**
    * Interval time in ms before to add a new dot
    * @type {Number}
    */
   refreshRate: 1000,

  didInsertElement() {
    let interval = setInterval(this.updateLoadingText.bind(this), this.get('refreshRate'));

    this.set('interval', interval);
    this.set('loadingText', this.get('text'));
  },

  willDestroyElement() {
    clearInterval(this.get('interval'));
  },

  updateLoadingText() {
    let loadingText;
    const text = this.get('text'),
          dots = this.get('dots'),
          maximumDots = this.get('maximumDots');

    if (dots < maximumDots) {

      // Generate string to render
      loadingText = text + '.'.repeat(dots + 1);

      this.set('loadingText', loadingText);
      this.incrementProperty('dots');
      return;
    }
    this.set('loadingText', text);
    this.set('dots', 0);

  }
});
