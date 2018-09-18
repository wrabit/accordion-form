// Defining requirements
var gulp = require( 'gulp' );
var plumber = require( 'gulp-plumber' );
var sass = require( 'gulp-sass' );
var watch = require( 'gulp-watch' );
var util = require('gulp-util');
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

//util.beep();

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

// gulp.task( 'minifycss', function() {
//     return gulp.src( [ paths.css + '/*.css', '!' + paths.css + '/*.min.*' ] )
//         .pipe( plumber( {
//                 errorHandler: function( err ) {
//                     console.log( err ) ;
//                     this.emit( 'end' );
//                 }
//             } ) )
//         .pipe( debug() )
//         .pipe( sourcemaps.init( { loadMaps: true } ) )
//         .pipe( cleanCSS( { compatibility: '*' } ) )
//         .pipe( rename( { suffix: '.min' } ) )
//         .pipe( sourcemaps.write( './' ) )
//         .pipe( gulp.dest( paths.css ) );
// });

// gulp.task( 'styles', function( callback ) {
//     gulpSequence( 'sass', 'minifycss' )( callback );
// });

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

        // .pipe(babel({
        //     presets: [
        //         ['es2015', { modules: false }]
        //     ]
        // }))

        // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
        .pipe(buffer())

        .pipe( uglify() )
        .on('error', function (err) { util.log(util.colors.red('[Error]'), err.toString()); })

        .pipe( rename( { suffix: '.min' } ) )

        // load and init sourcemaps
        // .pipe(sourcemaps.init({loadMaps: true}))
        // // write sourcemaps
        // .pipe(sourcemaps.write('./'))

        .pipe(gulp.dest( paths.dist ))

        .pipe( notify({message: 'JS task complete'}));

    // var scripts = [
    //     paths.dev + '/js/*.js'
    // ];
    // gulp.src( scripts )
    //     .pipe( jsImport( { hideConsole: true } ) )
    //     .pipe( rename( { suffix: '.min' } ) )
    //     .pipe( babel({
    //         presets: ['es2015-script'],
    //         parserOpts: { sourceType: 'module' }
    //     })
    //     .on('error', function(err) { console.log(err) }) )
    //     // .pipe( uglify() )
    //     .pipe( gulp.dest( paths.js ));

});

// Deleting any file inside the /src folder
gulp.task( 'clean-source', function() {
  return del( ['src/**/*'] );
});

function errorHandler(error) {
    util.log(error);
    console.log(error);
    // 3 beeps for error
    util.beep();
    util.beep();
    util.beep();
    return true;
}