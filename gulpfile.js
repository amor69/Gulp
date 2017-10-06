//js

var gulp = require('gulp');

// Require the gulp-scss plugin
var sass = require('gulp-sass');

// Require the browser sync
var browserSync = require('browser-sync');

//
gulp.task('hello', function() {
    console.log('Hello Zell');
});

// Compilation of styles.scss to style.css and adding a browser sync to add a web server and make instant changes
gulp.task('sass', function ()  {
    // return gulp.src('app/scss/**/*.scss') // gets all files ending with .scss in app/scss and children directories 
    return gulp.src('app/scss/styles.scss')
        .pipe(sass()) // Converts Sass to Css with gulp-sass
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Add  browser sync
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
});

// add watcher
gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // Reload the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
