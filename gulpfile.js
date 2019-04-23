
const { src, dest, watch, series, parallel } = require( 'gulp' ),
      notify = require( 'gulp-notify' ),
      {phpMinify} = require( '@cedx/gulp-php-minify' ),
      del = require( 'del' ),
      browsersync = require( 'browser-sync' ) .create(),
      wppot = require( 'gulp-wp-pot' ),
      imagemin = require( 'gulp-imagemin' ),
      sass = require( 'gulp-sass' ),
      autoprefixer = require( 'gulp-autoprefixer' ),
      sourcemaps = require( 'gulp-sourcemaps' ),
      rename = require( 'gulp-rename' ),
      babel = require( 'gulp-babel' ),
      concat = require( 'gulp-concat' ),
      stripdebug = require( 'gulp-strip-debug' ),
      uglify = require( 'gulp-uglify' );

/* Variables */
// Config WordPress
const WORDPRESS = {
    php_files: [
        './*.php',
        './**/*.php',
        './**/**/*.php'
    ],
    domain: {
        localUrl: 'http://localhost/projects/abcservitodo.wp/',
        textdomain: 'jt-abcservitodo',
    },
    admin : 'Juan Carlos Jiménez Gutiérrez <jcjimenez29@misena.edu.co>',
    team  : 'Juan Carlos Jiménez Gutiérrez <jcjimenez29@misena.edu.co>'
};
// Rutas
const PATHS = {
    styles: {
        src  : [
          './src/assets/scss/*.scss',
          './src/assets/scss/**/*.scss'
        ],
        dest : './dist/assets/css/',
        min  : './dist/assets/css/*.min.css'
    },
    scripts: {
        php: {
            dir: [      // Directorios
                '',
                'classes',
                'inc',
                'template-parts'
            ],
            src: [
                './src/php/'
            ],
            dest: './'
        },
        js: {
            src  : './src/assets/js/*.js',
            dest : './dist/assets/js/'
        },
    },
    images: {
        src: [
          './src/assets/images/*.{jpg,jpeg,png,gif,svg}',
          '!./src/assets/images/full-stack.jpeg',
          '!./src/assets/images/productos/'
        ],
        dest: './dist/assets/images/'
    }
};
// Browsers
const BROWSERS = [
    'last 2 version',
    '> 1%',
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4',
    'bb >= 10'
];

function hello() {
    return src( './' )
                .pipe( notify( 'Hello Gulp It\'s Works!' ) );
}
// Tarea: Live Server
function server() {
    const files = [
      WORDPRESS .php_files,
      PATHS .styles .min,
      PATHS .images .src
    ];

    browsersync .init( files, {
        proxy: WORDPRESS .domain .localUrl,
        open: true,
        injectChanges: true,
        watchEvents: [ 'change', 'add', 'unlink', 'addDir', 'unlinkDir' ]
    });

    watch_files();
}

/* Elimina archivos generados */
function remove( done ) {
    del .sync([
            './dist/*.*',
            './dist/',
            './languages/*.*',
            './languages/',
            './*.php',
            '!./classes/*.php',
            '!./classes/',
            '!./inc/*.php',
            '!./inc/',
            '!./template-parts/**/*.php',
            '!./template-parts/*.php',
            '!./template-parts/',
            '!./404.php',
            '!./archive.php',
            '!./comments.php',
            '!./footer.php',
            '!./functions.php',
            '!./header.php',
            '!./image.php',
            '!./index.php',
            '!./page.php',
            '!./search.php',
            '!./single.php'
        ]);
        console .log( 'Eliminó todos los archivos generados!' );
    done();
}
/* Elimina directorio node_moarchivos generadosdules */
function remove_packages( done ) {
    del .sync([
        './node_modules/*.*',
        './node_modules/'
    ]);
    console .log( 'Eliminó directorio "node_modules"!' );
    done();
}

/* Minifica archivos de PHP */
function compress_php( done ) {

    // Obtiene la ruta completa a minificar
    function get_path ( directory ) {
        let path;

        // Agrega o no el backslash
        function get_backslash( directory ) {
            return ( directory .length != 0 ) ? '/' : ''
        }

        path = `${ directory }${ get_backslash( directory ) }`;

        return ( directory === 'template-parts' ) ? `${ path }**/*.php` : `${ path }*.php`;
    }

    // Tarea: Ejecuta la tarea de minificación de archivos PHP
    function compress( path ) {
        return src( PATHS .scripts .php .src + get_path( path ), { read: true } )
             .pipe( phpMinify() )
             .pipe( dest( PATHS .scripts .php .dest + path ) );
    }

    // Intera las rutas donde se encuentran los archivos PHP
    PATHS .scripts .php .dir .forEach( path => {
        compress( path );
    });

    done();
}

// Tarea: Genera archivo de traducción
function wpot() {
	return src( './**/*.php' )
		.pipe( wppot( {
				domain: WORDPRESS .domain .textdomain,
				lastTranslator: WORDPRESS .admin,
				team: WORDPRESS .team
			})
		)
		.pipe( dest( './languages/' + WORDPRESS .domain .textdomain + '.pot' ) );
}
// Tarea: Minifica imágenes
function compress_images() {
    return src( PATHS .images .src, { allowEmpty: true } )
        .pipe( imagemin( [
            imagemin .gifsicle({ interlaced: true }),
            imagemin .jpegtran({ progressive: true }),
            imagemin .optipng({ optimizationLevel: 10 }),
            imagemin .svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })  /* end - svgo */
        ], {
            verbose: true
        }))
        .pipe( dest( PATHS .images .dest ) );
}
// Tarea: Convierte archivos Sass to CSS Minificado
function compress_scss() {
  return src( PATHS .styles .src )
    .pipe( sass( { outputStyle: 'expanded' } ) .on( 'error', sass .logError ) )
    .pipe( sourcemaps .init() )
    .pipe( autoprefixer( { browsers: BROWSERS } ) )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( sourcemaps .write( './' ) )
    .pipe( dest( PATHS .styles .dest ) );
}
// Task: Concatena y Minifica archivos JavaScript
function compress_js() {
    return src( PATHS .scripts .js .src, { sourcemaps: true } )
        .pipe( babel({
            presets: [ '@babel/env' ]
        }))
        .pipe( concat( 'build.js' ) )
        .pipe( stripdebug() )
        .pipe( dest( PATHS .scripts .js .dest, { sourcemaps: true } ) )
        .pipe( uglify() )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( dest( PATHS .scripts .js .dest, { sourcemaps: true } ) );
}

/* Define archivos a los que se les hace seguimiento */
function watch_files() {
  //watch( WORDPRESS .php_files, series( compress_php ) ) ;
  watch( [ './*.php', './**/*.php' ], browsersync .reload );
  watch( './style.css', browsersync .reload );
  watch( PATHS .styles .src, series( compress_scss ), browsersync .reload );
  watch( PATHS .scripts .js .src, series( compress_js ) );
  watch( PATHS .images .src, series( compress_images ) ) .on( 'change', browsersync .reload );
}

// exports .minphp = series( compress_php );

// Exports
module .exports = {
    default: series(
        parallel( compress_images, compress_js, compress_scss ),
        series( wpot, server )
    ),
    delpackages: series( remove_packages ),
    del: series( remove ),
    hello
}
