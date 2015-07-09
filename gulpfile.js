'use strict';

var gulp      = require('gulp'),
  browserify  = require('browserify'),
  babelify    = require('babelify'),
  source      = require('vinyl-source-stream'),
  buffer      = require('vinyl-buffer'),
  sourcemaps  = require('gulp-sourcemaps'),
  uglify      = require('gulp-uglify'),
  del         = require('del'),
  target      = 'dist';

gulp.task('clean', function (cb) {
  return del('dist', cb);
});

gulp.task('build:js', function () {
  browserify('app/app.js', {
    debug: true,
    paths: ['./app']
  })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(target));
});

gulp.task('build:html', function () {
  gulp.src('app/index.html', {
    base: 'app/'
  })
    .pipe(gulp.dest(target));
});

gulp.task('build', ['clean'], function () {
  gulp.start(['build:html', 'build:js']);
});

gulp.task('default', ['build']);
