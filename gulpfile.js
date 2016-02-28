var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var jasmineBrowser = require('gulp-jasmine-browser');
var watch = require('gulp-watch');
var less = require('gulp-less');
var rename = require('gulp-rename');

jsfiles = [
    'angularjs/app.js'
];

lessfiles = [
  'less/style.less',
]


gulp.task('js', function() {
   return browserify()
  .add(jsfiles)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('static/js'))
});

gulp.task('less', function() {
  return gulp.src(lessfiles)
  .pipe(less())
  .pipe(rename({dirname: ''}))
  .pipe(gulp.dest('static/css/'));
})

gulp.task('watch', function() {
  gulp.watch(jsfiles, ['js']);
  gulp.watch(lessfiles, ['less']);
});


gulp.task('jasmine', function() {
  var filesForTest = ['src/**/*.js', 'spec/**/spec.js']
return gulp.src(filesForTest)
  .pipe(watch(filesForTest))
  .pipe(jasmineBrowser.specRunner())
  .pipe(jasmineBrowser.server({port: 8888}));
});
