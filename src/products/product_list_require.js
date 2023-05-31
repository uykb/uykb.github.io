module.exports = function(name) {
    // switch...case... for pug template file.
    //   Intending to optimise webpack output files size.
    //   Because webpack will pack all files of the source folder 
    //   while using a variable value in command 'require'.
    switch(name) {
        case 'widgets/common_title_light':
            return require('../views/widgets/common_title_light.pug');
        case 'widgets/common_space':
            return require('../views/widgets/common_space.pug');
        case 'widgets/common_headline_title':
            return require('../views/widgets/common_headline_title.pug');
        case 'products/product_card_list':
            return require('../views/products/product_card_list.pug');
    }

    return require('../views/template_error.pug');
}
