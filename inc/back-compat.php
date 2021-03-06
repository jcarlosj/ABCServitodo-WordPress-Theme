<?php
/**
 * JT ABCServiTodo back compat functionality
 *
 * Prevents JT ABCServiTodo from running on WordPress versions prior to 4.7,
 * since this theme is not meant to be backward compatible beyond that and
 * relies on many newer functions and markup changes introduced in 4.7.
 *
 * @package WordPress
 * @subpackage JT_ABCServiTodo
 * @since JT ABCServiTodo 1.0.0
 */

/**
 * Prevent switching to JT ABCServiTodo on old versions of WordPress.
 *
 * Switches to the default theme.
 *
 * @since JT ABCServiTodo 1.0.0
 */
function jtabcservitodo_switch_theme() {
	switch_theme( WP_DEFAULT_THEME );
	unset( $_GET['activated'] );
	add_action( 'admin_notices', 'jtabcservitodo_upgrade_notice' );
}
add_action( 'after_switch_theme', 'jtabcservitodo_switch_theme' );

/**
 * Adds a message for unsuccessful theme switch.
 *
 * Prints an update nag after an unsuccessful attempt to switch to
 * JT ABCServiTodo on WordPress versions prior to 4.7.
 *
 * @since JT ABCServiTodo 1.0.0
 *
 * @global string $wp_version WordPress version.
 */
function jtabcservitodo_upgrade_notice() {
	$message = sprintf( __( 'JT ABCServiTodo requires at least WordPress version 4.7. You are running version %s. Please upgrade and try again.', 'jtabcservitodo' ), $GLOBALS['wp_version'] );
	printf( '<div class="error"><p>%s</p></div>', $message );
}

/**
 * Prevents the Customizer from being loaded on WordPress versions prior to 4.7.
 *
 * @since JT ABCServiTodo 1.0.0
 *
 * @global string $wp_version WordPress version.
 */
function jtabcservitodo_customize() {
	wp_die(
		sprintf(
			__( 'JT ABCServiTodo requires at least WordPress version 4.7. You are running version %s. Please upgrade and try again.', 'jtabcservitodo' ),
			$GLOBALS['wp_version']
		),
		'',
		array(
			'back_link' => true,
		)
	);
}
add_action( 'load-customize.php', 'jtabcservitodo_customize' );

/**
 * Prevents the Theme Preview from being loaded on WordPress versions prior to 4.7.
 *
 * @since JT ABCServiTodo 1.0.0
 *
 * @global string $wp_version WordPress version.
 */
function jtabcservitodo_preview() {
	if ( isset( $_GET['preview'] ) ) {
		wp_die( sprintf( __( 'JT ABCServiTodo requires at least WordPress version 4.7. You are running version %s. Please upgrade and try again.', 'jtabcservitodo' ), $GLOBALS['wp_version'] ) );
	}
}
add_action( 'template_redirect', 'jtabcservitodo_preview' );
