'use strict';
var gulp = require('gulp');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var KarmaServer = require('karma').Server;
var browserSync = require('browser-sync').create();

var paths = {
  src: {
    scripts: ['client/app/**/*.js'],
    html: ['client/app/**/*.html', 'client/index.html']
  },
  test: ['specs/**/*.js'],
  server: 'server/server.js'
};

//run karma tests
gulp.task('karma', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.config.js'
  }, done).start();
});