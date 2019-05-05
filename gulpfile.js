const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;

sass.compiler = require('node-sass');

gulp.task('uglify', function () {
  return gulp.
    src("src/assets/scripts/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("public/scripts"));
});

gulp.task('sass', () => {
  return gulp
    .src('src/assets/styles/app.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('public/styles')); 
});

gulp.task('copy-scripts', function() {
  return gulp
    .src('src/assets/scripts/*.js')
    .pipe(gulp.dest('public/scripts'));
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

gulp.task('copy-assets', [
  'copy-pwa',
  'copy-favicon',
  'copy-images',
]);

gulp.task('dev', ['sass', 'copy-scripts'], () => {
  gulp.watch('src/assets/scripts/*.js', ['copy-scripts']);
  gulp.watch('src/assets/styles/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'uglify', 'copy-assets']);