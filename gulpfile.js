var gulp = require('gulp'),
uglify = require('gulp-uglify'),
sass = require('gulp-sass'),
concat = require('gulp-concat'),
cleanCSS = require('gulp-clean-css'),
clean = require('gulp-clean'),
htmlmin = require('gulp-htmlmin'),
imageResize = require('gulp-image-resize'),
rename = require("gulp-rename"),
babel = require('gulp-babel'),
browserSync = require('browser-sync').create();

// array of tasks
var resizeImageTasks = [];
// object with the sizes, any size can be added to object
var imageSizes = [
    {
        "width": 90,
        "height": 352,
        "name": "_90_small_x1"
    },
    {
        "width": 90 * 2,
        "height": 352 * 2,
        "name": "_180_small_x2"
    }
]
// loop to create the task for size
imageSizes.forEach(function(size) {
    // naming the tasks
    var resizeImageTask = 'resize_' + size.name;
    // creating the tasks with the values
    gulp.task(resizeImageTask, function () {
        return gulp.src('src/assets/images/*.png')
        .pipe(imageResize({
            width : size.width,
            height : size.height,
            crop : true,
            upscale : true,
            quality : 1,
            background: 'none'
        }))
        .pipe(rename(function (path) { path.basename += size.name; }))
        .pipe(gulp.dest('dist/assets/images'));
    });
    // adding the tasks to the array
    resizeImageTasks.push(resizeImageTask);
})
// executes the array of tasks
gulp.task('resize_images', resizeImageTasks);


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
        .pipe(babel({presets: ['env']}))
        .pipe(uglify({ 'mangle': false }))
        .on('error', function (err) { console.log(err), err.toString() })
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function () {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-assets', function () {
    // not copy the images the resize images task is doing it
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
