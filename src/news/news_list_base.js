const topmenu = require('../jsons/topmenu.json')
const footer = require('../jsons/footer.json')
const news_list_require = require('./news_list_require.js')

// 'current_page' indicates to the current page no.
// The only one parameter which need to be changed in the files 'news_list_[n].js".
module.exports = function(current_page) {
    // Top menu part
    let template = require(`../views/topmenu.pug`);
    document.write(template({data: topmenu}));

    // Content part
    let part = require('../jsons/news/news_list.json');
    for (let id in part) {
        if (part[id].data.newslist !== undefined) {
            part[id].data.newslist_content = news_list_require(`news_list_${current_page}`);
            part[id].data.newslist_summary = news_list_require('news_list_summary');
            part[id].data.newslist_summary.current_page = current_page
        }
        template = news_list_require(part[id].widget);
        document.write(template({data: part[id].data}));
    }

    // Footer part
    template = require(`../views/footer.pug`);
    document.write(template({data: footer}));
}
