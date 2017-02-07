module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      //angular
      'client/lib/angular/angular.js',
      'client/lib/angular-route/angular-route.js',
      'client/lib/angular-mocks/angular-mocks.js',

      //app files
      'client/app/**/*.js',

      //spec files
      'specs/tests/algorithmTests.js'
    ],

    reporters: ['nyan', 'unicorn'],
    browsers: ['PhantomJS'],
    autoWatch: false,
    singleRun: true
  });
};
