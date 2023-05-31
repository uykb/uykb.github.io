module.exports = function(name) {
    // switch...case... for pug template file.
    //   Intending to optimise webpack output files size.
    //   Because webpack will pack all files of the source folder 
    //   while using a variable value in command 'require'.
    switch(name) {
        case 'widgets/common_title_dark':
            return require('../views/widgets/common_title_dark.pug');
        case 'widgets/common_image_carousel_fade':
            return require('../views/widgets/common_image_carousel_fade.pug');
        case 'widgets/common_card_cascade':
            return require('../views/widgets/common_card_cascade.pug');
        case 'widgets/common_image_text':
            return require('../views/widgets/common_image_text.pug');
        case 'widgets/common_image_list':
            return require('../views/widgets/common_image_list.pug');
        case 'widgets/common_space':
            return require('../views/widgets/common_space.pug');
        case 'products/product_tabs_content_pills':
            return require('../views/products/product_tabs_content_pills.pug');
        case 'products/product_tabs_content':
            return require('../views/products/product_tabs_content.pug');
        case 'products/product_tabs_text':
            return require('../views/products/product_tabs_text.pug');
        case 'products/product_AB_table':
            return require('../views/products/product_AB_table.pug');
        case 'products/product_AB_image_list':
            return require('../views/products/product_AB_image_list.pug');
        case 'products/product_AB_content':
            return require('../views/products/product_AB_content.pug');
        case 'products/product_AB_tag':
            return require('../views/products/product_AB_tag.pug');
        case 'products/product_AB_text':
            return require('../views/products/product_AB_text.pug');
        case 'products/product_AB_download':
            return require('../views/products/product_AB_download.pug');
    }

    return require('../views/template_error.pug');
}
