<section class="site-header-bottom">
    <section class="site-header-bottom-container">
        <div class="site-header-bottom-content">
            <?php if ( has_nav_menu( 'main' ) ) : ?>
                <nav id="site-main-navigation" class="main-navigation" aria-label="<?php esc_attr_e( 'Top Menu', 'jtabcservitodo' ); ?>">
                    <?php
                        wp_nav_menu(
                            array(
                                'theme_location' => 'main',
                                'menu_class'     => 'main-menu',
                                'items_wrap'     => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                            )
                        );
                    ?>
                </nav><!-- #site-main-navigation -->
            <?php endif; ?>
            <nav id="btn-quotes">
                <a href="#">Cotiza</a>
            </nav>
        </div>
    </section>
</section>