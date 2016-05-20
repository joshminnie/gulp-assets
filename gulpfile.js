var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require("gulp-rename"),
    scsslint = require('gulp-scss-lint');

// --------------------------------------------------------
// Stylesheets

// Lints the stylesheet
gulp.task('css:lint', function() {
  return gulp.src('./stylesheets/sass/*.scss')
    .pipe(scsslint());
});

// Compiles the stylesheet
gulp.task('css:compile', function() {
  return gulp.src('./stylesheets/sass/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({ browsers: ['> 5%'] }))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min', extname: '.css' }))
    .pipe(gulp.dest('./stylesheets/'));
});

// --------------------------------------------------------
// JavaScripts

// Lints the javascript
gulp.task('js:lint', function() {
  return;
});

// Compiles the javascript
gulp.task('js:compile', function() {
  return;
});

// --------------------------------------------------------
// Global tasks

gulp.task('default', ['css', 'js']);
gulp.task('css', ['css:lint', 'css:compile']);
gulp.task('js', ['js:lint', 'js:compile']);
