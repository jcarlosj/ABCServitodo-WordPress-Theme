const gulp = require( 'gulp' ),
      notify = require( 'gulp-notify' ),
      {phpMinify} = require( '@cedx/gulp-php-minify' ),
      del = require( 'del' ),
      browsersync = require( 'browser-sync' ) .create(),
      wppot = require( 'gulp-wp-pot' ),
      imagemin = require( 'gulp-imagemin' );

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
        }
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

function hello() {
    return gulp .src( './' )
                .pipe( notify( 'Hello Gulp It\'s Works!' ) );
}
// Tarea: Live Server
function server() {
    const files = [
      WORDPRESS .php_files
    ];

    browsersync .init( files, {
        proxy: WORDPRESS .domain .localUrl,
        open: true,
        injectChanges: true,
        watchEvents: [ 'change', 'add', 'unlink', 'addDir', 'unlinkDir' ]
    });

    gulp .watch( WORDPRESS .php_files, reload );
    gulp .watch( WORDPRESS .php_files ) .on( 'change', reload );
}
/* Reload */
const reload = () => {
    console .log( 'Recargando...' );
    browsersync .reload;
}

/* Elimina archivos generados */
function remove( done ) {
    del .sync([
            './*.php',
            './classes/*.php',
            './classes/',
            './inc/*.php',
            './inc/',
            './template-parts/**/*.php',
            './template-parts/*.php',
            './template-parts/',
            '!./index.php'
        ]);
        console .log( 'Elimino archivos PHP generados!' );
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
        return gulp .src( PATHS .scripts .php .src + get_path( path ), { read: true } )
             .pipe( phpMinify() )
             .pipe( gulp .dest( PATHS .scripts .php .dest + path ) )
             .pipe( notify( {
                 message: "Genera archivo: <%= file.relative %> @ <%= options.date %>",
                 templateOptions: {
                    date: new Date()
                 }
             }));
    }

    // Intera las rutas donde se encuentran los archivos PHP
    PATHS .scripts .php .dir .forEach( path => {
        compress( path );
    });

    done();
}

// Tarea: Genera archivo de traducción
function wpot() {
	return gulp .src( './**/*.php' )
		.pipe( wppot( {
				domain: WORDPRESS .domain .textdomain,
				lastTranslator: WORDPRESS .admin,
				team: WORDPRESS .team
			})
		)
		.pipe( gulp .dest( './languages/' + WORDPRESS .domain .textdomain + '.pot' ) )
        .pipe( notify( 'Genera archivo de traducción' ) );
}
// Tarea: Minifica imágenes
function compress_images() {
    return gulp .src( PATHS .images .src, { allowEmpty: true } )
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
        .pipe( gulp .dest( PATHS .images .dest ) );
}

exports .greet = hello;
exports .minify = gulp .parallel( compress_php, wpot );
exports .del = gulp .series( remove );
exports .wpot = gulp .series( wpot );
exports .minimages = gulp .series( compress_images );
exports .default = gulp .parallel( server );
