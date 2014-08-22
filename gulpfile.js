"use strict";

// -- DEPENDENCIES -------------------------------------------------------------

var gulp    = require('gulp');
var coffee  = require('gulp-coffee');
var concat  = require('gulp-concat');
var connect = require('gulp-connect');
var header  = require('gulp-header');
var jasmine = require('gulp-jasmine');
var uglify  = require('gulp-uglify');
var gutil   = require('gulp-util');
var stylus  = require('gulp-stylus');
var pkg     = require('./package.json');

// -- FILES --------------------------------------------------------------------

var path = {
  // Exports
  build : './build',
  assets: './www/assets',
  // Sources
  libraries: ['jquery',
              'jquerymobile',
              'backbone',
              'underscore'],
  jquery: {
    js: ['libraries/jquery/jquery-1.11.1.min.js',
         'libraries/jquery/jquery-1.11.1.min.map']
  },
  jquerymobile: {
    css: 'libraries/jquerymobile/jquery.mobile-1.4.3.min.css',
    img: ['libraries/jquerymobile/images/*.*', 
          'libraries/jquerymobile/images/**/*.*'],
    js : ['libraries/jquerymobile/jquery.mobile-1.4.3.min.js', 
          'libraries/jquerymobile/jquery.mobile-1.4.3.min.map']
  },
  backbone: {
    js: ['libraries/backbone/backbone-min.js', 
         'libraries/backbone/backbone-min.map']
  },
  underscore: {
    js: ['libraries/underscore/underscore-min.js', 
         'libraries/underscore/underscore-min.map']
  },
  source: ['source/*.coffee',
           'source/models/*.coffee',
           'source/collections/*.coffee',
           'source/views/*.coffee']
};

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link    <%= pkg.homepage %>',
  ' * @author  <%= pkg.author.name %> (<%= pkg.author.site %>)',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

// -- TASKS --------------------------------------------------------------------

// Web Server
gulp.task('webserver', function() {
  
  connect.server({ port: 8000, root: 'www/', livereload: true });

}); // end ==> Web Server

// Copy Libraries
gulp.task('copy_libraries', function() {
  
  gulp.src(path.jquery.js)
    .pipe(gulp.dest(path.assets+'/js'));

  gulp.src(path.jquerymobile.css)
    .pipe(gulp.dest(path.assets+'/css'));

  gulp.src(path.jquerymobile.img)
    .pipe(gulp.dest(path.assets+'/css/images'));

  gulp.src(path.jquerymobile.js)
    .pipe(gulp.dest(path.assets+'/js'));

  gulp.src(path.backbone.js)
    .pipe(gulp.dest(path.assets+'/js'));

  gulp.src(path.underscore.js)
    .pipe(gulp.dest(path.assets+'/js'))
    .pipe(connect.reload());

}); // end ==> Copy Libraries

// Build App
gulp.task('build_app', function() {
  
  gulp.src(path.source)
    .pipe(concat('app.coffee'))
    .pipe(coffee().on('error', gutil.log))
    .pipe(gulp.dest(path.build))
    .pipe(uglify({mangle: true}))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest(path.assets+'/js'))
    .pipe(connect.reload());

}); // end ==> Build App

// Init
gulp.task('init', function() {
  gulp.run(['copy_libraries', 'build_app']);
}); // end ==> Init

//  Default
gulp.task('default', function() {
  gulp.run(['webserver']);
  gulp.watch(path.source, ['build_app']);
  gulp.watch(path.libraries, ['copy_libraries']);
}); // end ==> Default