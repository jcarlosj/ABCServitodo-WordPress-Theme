const gulp = require( 'gulp' ),
      notify = require( 'gulp-notify' );

function hello() {
    return gulp .src( './' )
                .pipe( notify( 'Hello Gulp It\'s Works!' ) );
}

exports .greet = hello;
