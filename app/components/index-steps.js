import Ember from 'ember';

/**
 * Manage the steps to switch to carousel
 * on mobile.
 */
export default Ember.Component.extend({

  media: Ember.inject.service(),

  isCarouselInitialized: false,

  isViewportSmall: Ember.computed.or('media.isSmall', 'media.isMedium'),
  isViewportWide: Ember.computed.not('isViewportSmall'),

  didInsertElement() {
    this.registerEventResize();
  },

  registerEventResize() {
    $(window).on('resize', (e) => {
      this.onResize(e);
    }).trigger('resize');
  },

  onResize() {
    if (this.get('isViewportWide') && this.get('isCarouselInitialized')) {
      this.removeCarousel();
      return;
    }

    if (this.get('isViewportWide')) {
      return;
    }

    if (this.get('isCarouselInitialized')) {
      return;
    }

    this.addCarousel();
  },

  addCarousel() {
    $('#slides').addClass('owl-carousel').owlCarousel({
      items: 1
    });

    this.set('isCarouselInitialized', true);
  },

  removeCarousel() {
    $('#slides').removeClass('owl-carousel').owlCarousel('destroy');

    this.set('isCarouselInitialized', false);
  }

});
