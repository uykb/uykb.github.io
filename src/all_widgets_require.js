module.exports = function(name) {
    // switch...case... for pug template file.
    //   Intending to optimise webpack output files size.
    //   Because webpack will pack all files of the source folder 
    //   while using a variable value in command 'require'.
    switch(name) {
        case 'widgets/addtag':
            return require('./views/widgets/addtag.pug');
        case 'topmenu':
            return require('./views/topmenu.pug');
        case 'widgets/carousel_01':
            return require('./views/widgets/carousel_01.pug');
        case 'widgets/carousel_02':
            return require('./views/widgets/carousel_02.pug');
        case 'widgets/carousel_03':
            return require('./views/widgets/carousel_03.pug');
        case 'widgets/headline_01':
            return require('./views/widgets/headline_01.pug');
        case 'widgets/headline_02':
            return require('./views/widgets/headline_02.pug');
        case 'widgets/headline_03':
            return require('./views/widgets/headline_03.pug');
        case 'widgets/headline_04':
            return require('./views/widgets/headline_04.pug');
        case 'widgets/headline_05':
            return require('./views/widgets/headline_05.pug');
        case 'widgets/headline_06':
            return require('./views/widgets/headline_06.pug');
        case 'widgets/headline_07':
            return require('./views/widgets/headline_07.pug');
        case 'widgets/headline_08':
            return require('./views/widgets/headline_08.pug');
        case 'widgets/headline_09':
            return require('./views/widgets/headline_09.pug');
        case 'widgets/headline_10':
            return require('./views/widgets/headline_10.pug');
        case 'widgets/cardlist_01':
            return require('./views/widgets/cardlist_01.pug');
        case 'widgets/cardlist_02':
            return require('./views/widgets/cardlist_02.pug');
        case 'widgets/cardlist_03':
            return require('./views/widgets/cardlist_03.pug');
        case 'widgets/cardlist_04':
            return require('./views/widgets/cardlist_04.pug');
        case 'widgets/cardlist_05':
            return require('./views/widgets/cardlist_05.pug');
        case 'widgets/cardlist_06':
            return require('./views/widgets/cardlist_06.pug');
        case 'widgets/linklist_01':
            return require('./views/widgets/linklist_01.pug');
        case 'widgets/linklist_02':
            return require('./views/widgets/linklist_02.pug');
        case 'widgets/quote_01':
            return require('./views/widgets/quote_01.pug');
        case 'widgets/quote_02':
            return require('./views/widgets/quote_02.pug');
        case 'widgets/pricelist_01':
            return require('./views/widgets/pricelist_01.pug');
        case 'widgets/pricelist_02':
            return require('./views/widgets/pricelist_02.pug');
        case 'widgets/wizarddemo':
            return require('./views/widgets/wizarddemo.pug');
        case 'widgets/tabledemo':
            return require('./views/widgets/tabledemo.pug');
        case 'widgets/footerdemo':
            return require('./views/widgets/footerdemo.pug');
    }

    return require('./views/template_error.pug');
}
