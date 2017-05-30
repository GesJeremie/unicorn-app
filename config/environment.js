/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'unicorn',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'production') {
    ENV.apiHost = 'http://api.unicornfm.com';
    ENV.socketHost = 'ws:api.unicornfm.com/socket';
  }

  if (environment === 'development') {
    ENV.apiHost = 'http://localhost:4000';
    ENV.socketHost = 'ws:localhost:4000/socket';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  return ENV;
};
