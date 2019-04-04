<?php
/**
 * JT ABCServiTodo: Customizer
 *
 * @package WordPress
 * @subpackage JT_ABCServiTodo
 * @since 1.0.0
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function jtabcservitodo_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial(
			'blogname',
			array(
				'selector'        => '.site-title a',
				'render_callback' => 'jtabcservitodo_customize_partial_blogname',
			)
		);
		$wp_customize->selective_refresh->add_partial(
			'blogdescription',
			array(
				'selector'        => '.site-description',
				'render_callback' => 'jtabcservitodo_customize_partial_blogdescription',
			)
		);
	}

	/**
	 * Primary color.
	 */
	$wp_customize->add_setting(
		'primary_color',
		array(
			'default'           => 'default',
			'transport'         => 'postMessage',
			'sanitize_callback' => 'jtabcservitodo_sanitize_color_option',
		)
	);

	$wp_customize->add_control(
		'primary_color',
		array(
			'type'     => 'radio',
			'label'    => __( 'Primary Color', 'jtabcservitodo' ),
			'choices'  => array(
				'default' => _x( 'Default', 'primary color', 'jtabcservitodo' ),
				'custom'  => _x( 'Custom', 'primary color', 'jtabcservitodo' ),
			),
			'section'  => 'colors',
			'priority' => 5,
		)
	);

	// Add primary color hue setting and control.
	$wp_customize->add_setting(
		'primary_color_hue',
		array(
			'default'           => 199,
			'transport'         => 'postMessage',
			'sanitize_callback' => 'absint',
		)
	);

	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'primary_color_hue',
			array(
				'description' => __( 'Apply a custom color for buttons, links, featured images, etc.', 'jtabcservitodo' ),
				'section'     => 'colors',
				'mode'        => 'hue',
			)
		)
	);

	// Add image filter setting and control.
	$wp_customize->add_setting(
		'image_filter',
		array(
			'default'           => 1,
			'sanitize_callback' => 'absint',
			'transport'         => 'postMessage',
		)
	);

	$wp_customize->add_control(
		'image_filter',
		array(
			'label'   => __( 'Apply a filter to featured images using the primary color', 'jtabcservitodo' ),
			'section' => 'colors',
			'type'    => 'checkbox',
		)
	);
}
add_action( 'customize_register', 'jtabcservitodo_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function jtabcservitodo_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function jtabcservitodo_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Bind JS handlers to instantly live-preview changes.
 */
function jtabcservitodo_customize_preview_js() {
	wp_enqueue_script( 'jtabcservitodo-customize-preview', get_theme_file_uri( '/js/customize-preview.js' ), array( 'customize-preview' ), '20181231', true );
}
add_action( 'customize_preview_init', 'jtabcservitodo_customize_preview_js' );

/**
 * Load dynamic logic for the customizer controls area.
 */
function jtabcservitodo_panels_js() {
	wp_enqueue_script( 'jtabcservitodo-customize-controls', get_theme_file_uri( '/js/customize-controls.js' ), array(), '20181231', true );
}
add_action( 'customize_controls_enqueue_scripts', 'jtabcservitodo_panels_js' );

/**
 * Sanitize custom color choice.
 *
 * @param string $choice Whether image filter is active.
 *
 * @return string
 */
function jtabcservitodo_sanitize_color_option( $choice ) {
	$valid = array(
		'default',
		'custom',
	);

	if ( in_array( $choice, $valid, true ) ) {
		return $choice;
	}

	return 'default';
}
