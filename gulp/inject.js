'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function () {
  browserSync.reload();
});

gulp.task('inject-dapp-reload', ['inject-dapp'], function () {
  browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles', 'copyVendorImages', 'dapp-webpack'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/main.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], {read: false});

  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/assets/js/**/*.js'),
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/app/**/*.mock.js'),
  ])
    /*.pipe($.angularFilesort())*/.on('error', conf.errorHandler('AngularFilesort'));

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve'), path.join(conf.paths.tmp, '/dapp')],
    addRootSlash: false
  };

  var dappInjectScripts = gulp.src(path.join(conf.paths.tmp, '/dapp/bundle.js'), { read: false });
  var dappInjectOptions = {
    starttag: '<!-- inject:dapp -->',
    ignorePath: path.join(conf.paths.tmp, '/dapp'),
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/index.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe($.inject(dappInjectScripts, dappInjectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});


gulp.task('inject-dapp', ['dapp-webpack'], function () {
  var dappInjectScripts = gulp.src(path.join(conf.paths.tmp, '/dapp/bundle.js'), { read: false });
  var dappInjectOptions = {
    starttag: '<!-- inject:dapp -->',
    ignorePath: path.join(conf.paths.tmp, '/dapp'),
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.tmp, '/serve', '/index.html'))
    .pipe($.inject(dappInjectScripts, dappInjectOptions))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});