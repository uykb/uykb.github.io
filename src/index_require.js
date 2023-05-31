module.exports = function(name) {
    // switch...case... for pug template file.
    //   Intending to optimise webpack output files size.
    //   Because webpack will pack all files of the source folder 
    //   while using a variable value in command 'require'.
    switch(name) {
        case 'widgets/carousel_01':
            return require('./views/widgets/carousel_01.pug');
        case 'solutions/solution_list_headline':
            return require('./views/solutions/solution_list_headline.pug');
        case 'products/product_list_cardlist':
            return require('./views/products/product_list_cardlist.pug');
        case 'widgets/common_crew_list_02':
            return require('./views/widgets/common_crew_list_02.pug');
        case 'news/news_autolist':
            return require('./views/news/news_autolist.pug');
        case 'widgets/common_space':
            return require('./views/widgets/common_space.pug');
    }

    return require('./views/template_error.pug');
}
