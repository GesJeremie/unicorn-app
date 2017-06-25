import Ember from 'ember';

/**
 * Manage the steps to switch to carousel
 * on mobile.
 */
export default Ember.Component.extend({

  media: null,
  isCarouselInitialized: false,

  didInsertElement() {
    this.registerEventResize();
  },

  registerEventResize() {
    $(window).on('resize', (e) => {
      this.onResize(e);
    }).trigger('resize');
  },

  onResize() {
    if (this.isViewportWide() && this.get('isCarouselInitialized')) {
      this.removeCarousel();
      return;
    }

    if (this.isViewportWide()) {
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
  },

  isViewportWide() {
    return !this.get('media.isSmall') && !this.get('media.isMedium');
  }

});
