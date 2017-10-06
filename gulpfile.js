//js

var gulp = require('gulp');

// Require the gulp-scss plugin
var sass = require('gulp-sass');

// Require the browser sync
var browserSync = require('browser-sync');

// Require useref
var useref = require('gulp-useref');

// Require gulp-uglify
var uglify = require('gulp-uglify');

// Require gulpIf
var gulpIf = require('gulp-if');

// Require gulp-mimify-css
var minifyCSS = require('gulp-minify-css');

// Require gulp-imagemin
var imagemin = require('gulp-imagemin');

// Require gulp-cache
var cache = require('gulp-cache');

// require del
var del = require('del');

// Test function
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

// Live Refresh with Browser Sync
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
});

// add watcher - Observe file changes
gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // Reload the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Optimize CSS and JavaScript
gulp.task('useref', function(){
    var assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

gulp.task('useref', function(){
    var assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(uglify()) // to Minify Javascript Files
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

gulp.task('useref', function(){
    var assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        // Minimize only Javascript files
        .pipe(gulpIf('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

gulp.task('useref', function(){
    var assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        // Minifie seulement les fichiers CSS
        .pipe(gulpIf('*.css', minifyCSS()))
        // Minifie seulement les fichiers Javascript
        .pipe(gulpIf('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin({
            interlaced: true
        }))
        .pipe(gulp.dest('dist/images'))
});

// Optimize images
gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Met en cache les images passées par imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

// We can copy files with Gulp without plugin
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

// Automatically clean generated files
gulp.task('clean', function() {
    del('dist');
});

gulp.task('clean:dist', function(callback){
    del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback)
});

gulp.task('clean', function(callback) {
    del('dist');
    return cache.clearAll(callback);
});

