/*global require*/
'use strict';

var gulp        = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var gulpif       = require('gulp-if');
var livereload   = require('gulp-livereload');
var del          = require('del');
var scsslint     = require('gulp-scss-lint');
var merge        = require('merge-stream');
var uglify       = require('gulp-uglify');
var filter       = require('gulp-filter');
var stylish      = require('jshint-stylish');
var jshint       = require('gulp-jshint');
var gutil        = require('gulp-util');
var concat       = require('gulp-concat');
var cache        = require('gulp-cached');
var runSequence  = require('run-sequence');

var isProd = false;

var conf = {
  'build': './target',
  'src': './src',
  'source': {
    'prod': ['**', '!assets/scss{,/**}', '!assets/js{,/**}'],
    'dev': ['**']
  },
  'js': {
    'vendor': ['<%= src %>/assets/js/libs/jquery-1.11.1.js','<%= src %>/assets/js/libs/*.js'],
    'app': '<%= src %>/assets/js/src/*.js'
  },
  'scss': ['<%= src %>/assets/scss/**/*.scss']
};

conf.file = './gulpfile.js';
conf = JSON.parse(gutil.template(JSON.stringify(conf), conf));
delete conf.file;

gulp.task('setProd', function() {
  isProd = true;
});

gulp.task('clean', function(cb) {
  del([conf.build], cb);
});

gulp.task('scss-lint', function() {
  gulp.src(conf.scss)
    .pipe(cache('scsslinting'))
    .pipe(scsslint({
      'config': '.scss-lint.yml',
      'maxBuffer': 307200,
      'endless': true
    }));
});

gulp.task('js-hint', function() {
  gulp.src(conf.js.app)
    .pipe(cache('linting'))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('copy', function() {
  var source = isProd ? conf.source.prod : conf.source.dev;
  var onlyHtml = filter(['*.html']);
  return gulp.src(source, {cwd: conf.src})
        .pipe(cache('fullcopy'))
        .pipe(onlyHtml)
        .pipe(onlyHtml.restore())
        .pipe(gulp.dest(conf.build))
        .pipe(livereload());
});

gulp.task('sass', function() {
  var dest = conf.build + '/assets/css/';

  gulp.src(conf.scss)
    .pipe(cache('scss'))
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass({
        outputStyle: isProd ? 'compressed' : 'expanded',
        includePaths: [require('node-bourbon').includePaths]
      }).on('error', sass.logError))
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(gulp.dest(dest))
    .pipe(livereload());
});

gulp.task('js', function() {
  var dest = conf.build + '/assets/js/';

  var vendor = gulp.src(conf.js.vendor)
      .pipe(cache('js'))
      .pipe(gulpif(!isProd, sourcemaps.init()))
      .pipe(concat('vendor.js'))
      .pipe(gulpif(isProd, uglify()))
      .pipe(gulpif(!isProd, sourcemaps.write()))
      .pipe(gulp.dest(dest));

  var app = gulp.src(conf.js.app)
      .pipe(cache('js'))
      .pipe(gulpif(!isProd, sourcemaps.init()))
      .pipe(concat('app.js'))
      .pipe(gulpif(isProd, uglify()))
      .pipe(gulpif(!isProd, sourcemaps.write()))
      .pipe(gulp.dest(dest));

  return merge(vendor, app).pipe(livereload());

});

gulp.task('build', function(callback) {
  runSequence('clean', ['copy', 'sass', 'js'], callback);
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(conf.scss, ['scss-lint', 'sass']);
  gulp.watch(conf.js.app, ['js-hint', 'js']);
  gulp.watch('./src/**/*.{html,png,jpeg,jpg}', ['copy']);
});

gulp.task('default', ['lint', 'build', 'watch']);

gulp.task('prod', ['setProd', 'build']);

gulp.task('lint', ['scss-lint', 'js-hint']);
