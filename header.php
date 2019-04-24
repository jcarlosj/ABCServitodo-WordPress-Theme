<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage JT_ABCServiTodo
 * @since 1.0.0
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="profile" href="https://gmpg.org/xfn/11" />
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site layout-theme">
	<header id="masthead" class="<?php echo is_singular() && jtabcservitodo_can_show_post_thumbnail() ? 'site-header featured-image' : 'site-header'; ?>">
		<section class="site-header-top">
			<div class="space"></div>
			<div class="content">
				<h3>Header Top</h3>
			</div>
			<div class="space"></div>
		</section>

		<section class="site-header-middle">	
			<section class="site-header-middle-container">
				<div class="site-header-middle-content">
					<h3>Header Middle</h3>
				</div>
			</section>
		</section>

		<section class="site-header-bottom">	
			<section class="site-header-bottom-container">
				<div class="site-header-bottom-content">
					<h3>Header Bottom</h3>
				</div>
			</section>
		</section>

	</header><!-- #masthead -->

	<div id="content" class="site-content">
