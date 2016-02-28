var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var jasmineBrowser = require('gulp-jasmine-browser');
var watch = require('gulp-watch');

jsfiles = [
    'angularjs/app.js'
];


gulp.task('js', function() {
   return browserify()
  .add(jsfiles)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('static/js'))
});

gulp.task('watch', function() {
  gulp.watch(jsfiles, ['js']);
});

gulp.task('jasmine', function() {
  return gulp.src(['static/**/*.js', 'spec/**/spec.js'])
  .pipe(jasmineBrowser.specRunner())
  .pipe(jasmineBrowser.server({port: 8888}));
})

gulp.task('jasminewatch', function() {
  var filesForTest = ['src/**/*.js', 'spec/**/spec.js']
return gulp.src(filesForTest)
  .pipe(watch(filesForTest))
  .pipe(jasmineBrowser.specRunner())
  .pipe(jasmineBrowser.server({port: 8888}));
});
