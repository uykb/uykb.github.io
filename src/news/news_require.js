module.exports = function(name) {
    // switch...case... for pug template file.
    //   Intending to optimise webpack output files size.
    //   Because webpack will pack all files of the source folder 
    //   while using a variable value in command 'require'.
    switch(name) {
        case 'widgets/common_title_dark':
            return require('../views/widgets/common_title_dark.pug');
        case 'news/news_doc_content':
            return require('../views/news/news_doc_content.pug');
    }

    return require('../views/template_error.pug');
}
