<section class="site-header-top">
    <div class="space"></div>
    <div class="content">
        <?php if ( has_nav_menu( 'secondary' ) ) : ?>
            <nav id="site-secondary-navigation" class="secondary-navigation" aria-label="<?php esc_attr_e( 'Top Menu', 'jtabcservitodo' ); ?>">
                <?php
                wp_nav_menu(
                    array(
                        'theme_location' => 'secondary',
                        'menu_class'     => 'secondary-menu',
                        'items_wrap'     => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                    )
                );
                ?>
            </nav><!-- #site-navigation -->
        <?php endif; ?>
        <?php if ( has_nav_menu( 'social' ) ) : ?>
            <nav class="social-navigation" aria-label="<?php esc_attr_e( 'Social Links Menu', 'jtabcservitodo' ); ?>">
                <?php
                    wp_nav_menu(
                        array(
                            'theme_location' => 'social',
                            'menu_class'     => 'social-links-menu',
                            'link_before'    => '<span class="screen-reader-text">',
                            'link_after'     => '</span>' . jtabcservitodo_get_icon_svg( 'link' ),
                            'depth'          => 1,
                        )
                    );
                ?>
            </nav><!-- .social-navigation -->
        <?php endif; ?>
    </div>
    <div class="space"></div>
</section>