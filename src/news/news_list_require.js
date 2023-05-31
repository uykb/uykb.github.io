module.exports = function(name) {
    // switch...case... for pug template file.
    //   Intending to optimise webpack output files size.
    //   Because webpack will pack all files of the source folder 
    //   while using a variable value in command 'require'.
    switch(name) {
        case 'widgets/common_title_light':
            return require('../views/widgets/common_title_light.pug');
        case 'news/news_list_content':
            return require('../views/news/news_list_content.pug');
    }

    // switch...case... for news list json file.
    switch(name) {
        case 'news_list_1':
            return require('../jsons/news/news_list_1.json');
        case 'news_list_2':
            return require('../jsons/news/news_list_2.json');
        case 'news_list_3':
            return require('../jsons/news/news_list_3.json');
        case 'news_list_4':
            return require('../jsons/news/news_list_4.json');
        case 'news_list_5':
            return require('../jsons/news/news_list_5.json');
        case 'news_list_summary':
            return require('../jsons/news/news_list_summary.json');
    }

    return require('../views/template_error.pug');
}
