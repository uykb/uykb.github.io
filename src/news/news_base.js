const topmenu = require('../jsons/topmenu.json')
const footer = require('../jsons/footer.json')
const news_require = require('./news_require.js')

// Related to the news content json file
module.exports = function(content) {
    if (content != undefined) {
        // Top menu part
        let template = require(`../views/topmenu.pug`);
        document.write(template({data: topmenu}));

        // Content part
        // Part1
        let part = require('../jsons/news/news_doc_title.json');
        template = news_require(part.widget);
        document.write(template({data: part.data}));
        // Part2, The news list part.
        template = news_require(content.widget);
        document.write(template({data: content}));

        // Footer part
        template = require(`../views/footer.pug`);
        document.write(template({data: footer}));
    }
}
