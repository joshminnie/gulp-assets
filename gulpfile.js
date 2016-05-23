var gulp = require('gulp'),
    rename = require("gulp-rename");

// Watch all files so that we can trigger auto-streaming the build.
gulp.task('watch', function() {
  gulp.watch(['javascripts/**/*.js', '.eslintrc.yml', '.eslintignore'], ['js']);
  gulp.watch('stylesheets/sass/**/*.scss', ['css']);
});

// --------------------------------------------------------
// Stylesheets
var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    scsslint = require('gulp-scss-lint');

// Lints the stylesheet
gulp.task('css:lint', function() {
  return gulp.src('stylesheets/sass/**/*.scss')
    .pipe(scsslint());
});

// Compiles the stylesheet
gulp.task('css:compile', function() {
  return gulp.src('stylesheets/sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({ browsers: ['> 5%'] }))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min', extname: '.css' }))
    .pipe(gulp.dest('stylesheets/'));
});

// --------------------------------------------------------
// JavaScripts
var eslint = require('gulp-eslint');

// Lints the javascript
gulp.task('js:lint', function() {
  return gulp.src('javascripts/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

// Compiles the javascript
gulp.task('js:compile', function() {
  return;
});

// --------------------------------------------------------
// Global tasks

gulp.task('default', ['css', 'js', 'watch']);
gulp.task('css', ['css:lint', 'css:compile']);
gulp.task('js', ['js:lint', 'js:compile']);
