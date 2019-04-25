<section class="site-header-middle">	
    <section class="site-header-middle-container">
        <div class="site-header-middle-content main-navbar">
            <nav class="brand">
                <?php if ( has_custom_logo() ) : ?>
                    <div class="site-logo"><?php the_custom_logo(); ?></div>
                <?php else: ?>
                    <?php $blog_info = get_bloginfo( 'name' ); ?>
                    <?php if ( ! empty( $blog_info ) ) : ?>
                        <?php if ( is_front_page() && is_home() ) : ?>
                            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
                                <h1 class="site-title">
                                    <?php bloginfo( 'name' ); ?>    
                                </h1>
                                <p><?php bloginfo( 'description' ); ?></p>
                            </a>    
                        <?php else : ?>
                            <p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
                        <?php endif; ?>
                    <?php endif; ?>
                <?php endif; ?>
            </nav> 
            <nav class="custom-info">
                <div class="custom-info-data">
                    <div class="custom-info-email">
                        <p>Correo<br>info@example.com</p>
                    </div>
                </div>
                <div class="custom-info-data">
                    <div class="custom-info-phone"> 
                        <p>Teléfono<br> 302.123.5689</p>
                    </div>
                </div>
                <div class="custom-info-data">
                    <div class="custom-info-hour"> 
                        <p>Abierto<br> Lunes - Viernes, 09:00 - 18:00</p>
                    </div>
                </div>
            </nav>
        </div>
    </section>
</section>