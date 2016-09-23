var gulp = require('gulp'),
    rename = require("gulp-rename"),
    config = require('./config.json');


// Watch all files so that we can trigger auto-streaming the build.
gulp.task('watch', function() {
  gulp.watch(config.watch.js, ['js']);
  gulp.watch(config.watch.css, ['css']);
});

// --------------------------------------------------------
// Stylesheets
var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    scsslint = require('gulp-scss-lint');

// Compiles the *.scss files to *.css
gulp.task('css:compile', function() {
  return gulp.src(config.build.sass)
    .pipe(scsslint())
    .pipe(sass())
    .pipe(rename({ suffix: '', extname: '.css' }))
    .pipe(gulp.dest('build/stylesheets/'));
});

// Preps and moves the files to the dist directory
gulp.task('css:dist', ['css:compile'], function() {
  return gulp.src(config.build.css)
    .pipe(autoprefixer({ browsers: ['> 5%'] }))
    .pipe(cssnano())
    .pipe(gulp.dest(config.dist.css));
});


// --------------------------------------------------------
// JavaScripts
var eslint = require('gulp-eslint');

// Lints the javascript
gulp.task('js:lint', function() {
  return gulp.src(config.build.js)
    .pipe(eslint())
    .pipe(eslint.format());
});

// Compiles the javascript
gulp.task('js:compile', function() {
  return;
});

gulp.task('js:dist', ['js:compile'], function() {
  return gulp.src(config.build.js)
    .pipe(gulp.dest(config.dist.js));
});


// --------------------------------------------------------
// Global tasks

gulp.task('default', ['css', 'js', 'watch']);
gulp.task('css', ['css:compile', 'css:dist']);
gulp.task('js', ['js:lint', 'js:compile', 'js:dist']);
