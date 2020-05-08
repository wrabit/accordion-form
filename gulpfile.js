// Defining requirements
var gulp = require( 'gulp' );
var plumber = require( 'gulp-plumber' );
var sass = require( 'gulp-sass' );
var watch = require( 'gulp-watch' );
var log = require('fancy-log');
var beeper = require('beeper');
var colors = require('ansi-colors');

var notify = require('gulp-notify');
var rename = require( 'gulp-rename' );
var uglify = require( 'gulp-uglify' );
var sourcemaps = require( 'gulp-sourcemaps' );
var browserSync = require( 'browser-sync' ).create();
var del = require( 'del' );
var cleanCSS = require( 'gulp-clean-css' );
var gulpSequence = require( 'gulp-sequence' );
var autoprefixer = require( 'gulp-autoprefixer' );
var buffer = require('gulp-buffer');
var debug = require('gulp-debug');

// Configuration file to keep your code DRY
var cfg = require( './gulpconfig.json' );
var paths = cfg.paths;

// Run:
// gulp sass
// Compiles SCSS files in CSS
gulp.task('sass', function() {
    var stream = gulp.src(paths.sass + '/*.scss')
        .pipe( plumber(errorHandler))
        .pipe( sourcemaps.init({ loadMaps: true }))
        .pipe( sass({ errLogToConsole: true }))
        .pipe( autoprefixer('last 2 versions'))
        .pipe( sourcemaps.write(undefined, { sourceRoot: null }))
        .pipe( gulp.dest(paths.css) );

    return stream;
});

// Run:
// gulp watch
// Starts watcher. Watcher runs gulp sass task on changes
gulp.task( 'watch', function() {
    //gulp.watch( paths.sass + '/**/*.scss', ['styles'] );
    gulp.watch( [paths.src + '/*.js'], ['js'] );
});

// Run:
// gulp browser-sync
// Starts browser-sync task for starting the server.
gulp.task( 'browser-sync', function() {
    browserSync.init( cfg.browserSyncWatchFiles, cfg.browserSyncOptions );
});


// Run:
// gulp watch-bs
// Starts watcher with browser-sync. Browser-sync reloads page automatically on your browser
gulp.task( 'watch-bs', ['browser-sync', 'watch', 'js'], function() {});

// Run:
// gulp scripts.
// Uglifies and concat all JS files into one
gulp.task( 'js', function() {

    return gulp.src(paths.src + '/*.js') // no need of reading file because browserify does.
        .pipe(plumber(errorHandler))
        // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
        .pipe(buffer())
        .pipe( uglify() )
        .on('error', function (err) {
            log(colors.red('[Error]'), err.toString());
        })
        .pipe( rename( { suffix: '.min' } ) )
        .pipe(gulp.dest( paths.dist ))
        .pipe( notify({message: 'JS task complete'}));
});

// Deleting any file inside the /src folder
gulp.task( 'clean-source', function() {
  return del( ['src/**/*'] );
});

function errorHandler(error) {
    log(error);
    console.log(error);
    // 3 beeps for error
    beep();
    beep();
    beep();
    return true;
}