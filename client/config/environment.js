/* jshint node: true */

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'client',
    podModulePrefix: 'client/src',
    environment: environment,
    rootURL: '/',
    apiNamespace: '/api',
    apiHost: 'localhost:3001',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  }

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self'",
    'font-src': "'self'",
    'connect-src': "'self'",
    'img-src': "'self' maps.marlborough.govt.nz",
    'style-src': "'self' 'unsafe-inline'", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
    'media-src': "'self'"
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy = {
      'style-src': ["'unsafe-inline'", '*', 'unsafe-inline'].join(' '),
      'script-src': ["'self'", '*', "'unsafe-eval'", ENV.apiNamespace].join(' '),
      'connect-src': ["'self'", '*', ENV.apiNamespace].join(' '),
      'img-src': ENV.contentSecurityPolicy['img-src'] + ' data:'
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none'

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false
    ENV.APP.LOG_VIEW_LOOKUPS = false

    ENV.APP.rootElement = '#ember-testing'
  }

  if (environment === 'production') {

  }

  return ENV
}
