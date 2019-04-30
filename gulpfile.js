const gulp = require('gulp');
const gulpMinify = require('gulp-minify');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('sass', () => {
  return gulp
    .src('src/assets/styles/app.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('public/styles')); 
});
 
gulp.task('copy-pwa', function() {
  return gulp
    .src('src/pwa/**/*')
    .pipe(gulp.dest('public/'));
});

gulp.task('copy-favicon', function() {
  return gulp
    .src('src/favicon.ico')
    .pipe(gulp.dest('public/'));
});

gulp.task('copy-images', function() {
  return gulp
    .src('src/assets/images/**/*')
    .pipe(gulp.dest('public/images'));
});

gulp.task('compress', () => {
  return gulp
    .src('src/assets/scripts/*.js')
    .pipe(gulpMinify({
      ext:{
        min:'.min.js'
      },
    }))
    .pipe(gulp.dest('public/scripts'));
});

gulp.task('copy-assets', [
  'copy-pwa',
  'copy-favicon',
  'copy-images',
]);

gulp.task('dev', ['compress','sass'], () => {
  gulp.watch('src/assets/styles/app.scss', ['sass']);
  gulp.watch('src/assets/scripts/*.js', ['compress']);
});

gulp.task('default', [
  'compress', 
  'copy-assets',
  'sass',
]);