var gulp = require('gulp'),
uglify = require('gulp-uglify'),
sass = require('gulp-sass'),
concat = require('gulp-concat'),
cleanCSS = require('gulp-clean-css'),
clean = require('gulp-clean'),
htmlmin = require('gulp-htmlmin'),
browserSync = require('browser-sync').create();


gulp.task('sass', function () {
    gulp.src(['src/sass/*.scss'])
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS())
      .pipe(concat('styles.css'))
      .pipe(gulp.dest('dist/css/'));
});

//Task to delete the old versions of the js files
gulp.task('clean-scripts', function () {
    return gulp.src(['dist/js/*.js', 'js/*.js'], { read: false })
      .pipe(clean({ force: true }));
});

gulp.task('copy-js', function () {
    return gulp.src('src/js/*.js')
        // .pipe(uglify({ 'mangle': false }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function () {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-assets', function () {
    return gulp.src('src/assets/*.*')
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('browser-sync', function(){
    browserSync.init({
        server:{
            baseDir: './dist'
        }
    });
});

gulp.task('watch', ['sass', 'copy-assets', 'copy-html', 'copy-js', 'browser-sync'], function(){
    gulp.watch('src/assets/*.*', ['copy-assets']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copy-html']);
    gulp.watch('src/js/*.js', ['copy-js']);
    gulp.watch('src/**/*.js', browserSync.reload);
    
});

gulp.task('deploy', ['sass', 'clean-scripts', 'copy-js', 'copy-html', 'copy-assets']);

gulp.task('default', ['deploy']);
