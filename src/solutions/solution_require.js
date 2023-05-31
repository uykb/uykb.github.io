module.exports = function(name) {
    // switch...case... for pug template file.
    //   Intending to optimise webpack output files size.
    //   Because webpack will pack all files of the source folder 
    //   while using a variable value in command 'require'.
    switch(name) {
        case 'widgets/common_space':
            return require('../views/widgets/common_space.pug');
        case 'widgets/common_title_dark':
            return require('../views/widgets/common_title_dark.pug');
        case 'widgets/common_headline_title':
            return require('../views/widgets/common_headline_title.pug');
        case 'widgets/common_card_media_list':
            return require('../views/widgets/common_card_media_list.pug');
        case 'widgets/common_image_carousel':
            return require('../views/widgets/common_image_carousel.pug');
        case 'widgets/common_brandlink_list':
            return require('../views/widgets/common_brandlink_list.pug');
        case 'solutions/solution_doc_paragraph':
            return require('../views/solutions/solution_doc_paragraph.pug');
        case 'solutions/solution_doc_list_flush':
            return require('../views/solutions/solution_doc_list_flush.pug');
        case 'solutions/solution_doc_download':
            return require('../views/solutions/solution_doc_download.pug');
        case 'solutions/solution_doc_bgimage':
            return require('../views/solutions/solution_doc_bgimage.pug');
        case 'solutions/solution_image_accordion':
            return require('../views/solutions/solution_image_accordion.pug');
        case 'solutions/solution_doc_pricelist':
            return require('../views/solutions/solution_doc_pricelist.pug');
    }

    return require('../views/template_error.pug');
}
