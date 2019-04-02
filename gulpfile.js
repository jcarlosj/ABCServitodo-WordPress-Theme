const gulp = require( 'gulp' ),
      notify = require( 'gulp-notify' ),
      {phpMinify} = require( '@cedx/gulp-php-minify' );

// Variables
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
    }
};

function hello() {
    return gulp .src( './' )
                .pipe( notify( 'Hello Gulp It\'s Works!' ) );
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

exports .greet = hello;
exports .minify = gulp .parallel( compress_php );
