import Ember from 'ember';

/**
 * Autofocus inputs depending the current viewport
 */
export default Ember.Component.extend({

  media: Ember.inject.service(),

  /**
   * The target to autofocus.
   *
   * Examples:
   * {{#input-autofocus target=".inputs"}}
   *   {{input class="inputs"}}
   *   {{input class="inputs"}}
   * {{/input}}
   *
   * {{#input-autofocus target="#unicorn"}}
   *   {{input id="unicorn"}}
   * {{/input-autofocus}}
   *
   * @type {String}
   */
  target: '',

  /**
   * Check if the viewport is small (media.isSmall || media.isMedium)
   * @return {Boolean}
   */
  isViewportSmall: Ember.computed.or('media.isSmall', 'media.isMedium'),


  didInsertElement() {
    let target = this.get('target');

    if (this.get('isViewportSmall')) {
      return;
    }

    this.$(target).focus();
  }
});
