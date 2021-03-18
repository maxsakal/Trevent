var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require("gulp-notify"),
  sourcemaps = require('gulp-sourcemaps'),
  fileinclude = require('gulp-file-include'),
  postcss    = require('gulp-postcss');

var srcPath = './src/';
var distPath = './dist/';

var paths = {
  srcSass: srcPath + 'sass',
  srcJs: srcPath + 'js',
  srcImg: srcPath + 'images',
  srcFonts: srcPath + 'fonts',
  distCss: distPath + 'css',
  distJs: distPath + 'js',
  distImg: distPath + 'images',
  distFonts: srcPath + 'fonts',
};


const browserSyncTask = done => {

  browserSync.init({
    server: {
      baseDir: "./dist/"
    },
    open: true,
    notify: true,
    injectChanges: true,
  });

  done();

};

const browserSyncReload = done => {
  browserSync.reload();
  done();
};

const jsTask = done => {

  gulp.src(paths.srcJs + '/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.distJs))
    .pipe(browserSync.stream());

  done();

};

const sassTask = done => {

  gulp.src(paths.srcSass + '/**/*.+(scss|sass)')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(postcss([ require('postcss-combine-media-query') ]))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.distCss))
    .pipe(browserSync.stream());

  done();


};

const fileincludeTask = done => {

  gulp.src(['./src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());

  done();
}

const moveAssets = done => {

  done();
}

const defaultTask = done => {

  gulp.watch(paths.srcSass + '/**/*.+(scss|sass)', gulp.series(sassTask));
  gulp.watch(paths.srcJs + '/**/*.js', gulp.series(jsTask));
  gulp.watch('./src/*.html', gulp.series(fileincludeTask));

  done();

};

exports.default = gulp.series(browserSyncTask, sassTask, jsTask, fileincludeTask, moveAssets, defaultTask);

exports.move = moveAssets;
