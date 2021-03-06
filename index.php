<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage JT_ABCServiTodo
 * @since 1.0.0
 */

get_header();
?>

	<section id="primary" class="content-area">
		<main id="main" class="site-main">

			<section class="site-main-container">
				<div class="site-main-content">
					<h2>Content</h2>
				</div>
			</section>			

		</main><!-- .site-main -->
	</section><!-- .content-area -->

<?php
get_footer();
