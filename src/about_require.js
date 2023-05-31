module.exports = function(name) {
    // switch...case... for pug template file.
    //   Intending to optimise webpack output files size.
    //   Because webpack will pack all files of the source folder 
    //   while using a variable value in command 'require'.
    switch(name) {
        case 'widgets/common_title_light':
            return require('./views/widgets/common_title_light.pug');
        case 'widgets/common_space':
            return require('./views/widgets/common_space.pug');
        case 'widgets/common_headline_title':
            return require('./views/widgets/common_headline_title.pug');
        case 'widgets/common_text_paragraph':
            return require('./views/widgets/common_text_paragraph.pug');
        case 'widgets/common_image_carousel':
            return require('./views/widgets/common_image_carousel.pug');
        case 'widgets/addtag':
            return require('./views/widgets/addtag.pug');
        case 'widgets/common_contact_list':
            return require('./views/widgets/common_contact_list.pug');
        case 'widgets/common_crew_list_01':
            return require('./views/widgets/common_crew_list_01.pug');
    }

    return require('./views/template_error.pug');
}
