var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    livereload = require('gulp-livereload');

gulp.task('client', function ()
{
  return gulp.src('./src/client/index.coffee', { read: false })
             .pipe(browserify({ transform: ['coffeeify'], extensions: ['.coffee'] }))
             .pipe(concat('client.js'))
             // .pipe(uglify())
             .pipe(gulp.dest('./bin'));
});

gulp.task('server', function ()
{
  return gulp.src('./src/server/*.coffee')
             .pipe(coffee({bare: true}))
             .pipe(gulp.dest('./bin/server'));
});

gulp.task('shared', function ()
{
  return gulp.src('./src/*.coffee')
             .pipe(coffee({bare: true}))
             .pipe(gulp.dest('./bin'));
});

gulp.task('default', function()
{
  gulp.watch('./src/**/*.coffee', function()
  {
    gulp.run('client');
    gulp.run('server');
    gulp.run('shared');
  });
});