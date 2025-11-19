<?php 

function api_get_noentulho($request) {

    $posts = array();

    // $args = array(
    //     'post_type' => 'filmes',
    //     'posts_per_page' => -1,
    //     // 'meta_query' => []
    // );


    $loop = get_post( 8 );

    // while ($loop->have_posts()) : $loop->the_post();
        $id = $loop->ID;
        $slug = get_post_field('post_name', $id);
        $titulo = $loop->post_title;
        $realizador = get_field( 'realizador', $id );
        $ficheiros = get_field( 'ficheiros', $id );
        // $image = get_the_post_thumbnail( $id );
        // $thumbnail_id = get_post_thumbnail_id( $id );
        // $thumbnail_image = wp_get_attachment_image_src( $thumbnail_id, '1920x1080' );
        $acf = get_fields( $id );
        $acf_video = get_field( 'videodrop', $id);
        $fieldGroup = acf_get_field_group(64);
        $fields = acf_get_fields_by_id($id);
        // $acf_video_object = get_field_object( 'video_page');
        // $acf_video_page = implode('', [$acf_video_object['value'], $acf_video_object['append']]);
        
        // $term = get_the_terms( $id, 'tipo_de_filme' );
        // $term_name = get_term_field( 'name', $term[0], 'tipo_de_filme');
        // $term_id  = get_term_field( 'term_id', $term[0], 'tipo_de_filme');
        // $term_slug  = get_term_field( 'slug', $term[0], 'tipo_de_filme');
        // $list = get_posts( $args );

        

        $post = array(
            // 'loop' => $loop,
            // 'id' => $id,
            // 'slug' => $slug,
            // 'titulo' => $titulo,
            // 'realizador' => $realizador,
            // 'ficheiros' => $ficheiros,
            // // 'image' => $image,
            'acf' => $acf,
            // 'fieldGroup' => $fieldGroup,
            // 'fiep' => $fields,
            // 'videodrop' => $acf_video,
            // 'video_page' => $acf_video_page,
            // 'thumbnail_image' => $thumbnail_image[0],
            // 'term' => $term,
            // 'term_name' => $term_name,
            // 'term_id' => $term_id,
            // 'term_slug' => $term_slug,
        );

        $posts[$titulo] = $post; 

    // endwhile;

    
    return rest_ensure_response( $posts );
}

function api_register_noentulho_routes() {
    register_rest_route( 'no/', '/entulho', array(
        array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'api_get_noentulho',
        // 'permission_callback' => '__return_true',
        ),
    ));
}

add_action( 'rest_api_init', 'api_register_noentulho_routes' );

