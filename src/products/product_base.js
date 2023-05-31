const topmenu = require('../jsons/topmenu.json')
const footer = require('../jsons/footer.json')
const product_require = require('./product_require.js')

module.exports = function(content) {
    if (content !== undefined) {
        // Top menu part
        let template = require(`../views/topmenu.pug`);
        document.write(template({data: topmenu}));

        // Content part
        for (let id in content) {
            template = product_require(content[id].widget);
            document.write(template({data: content[id].data}));
        }

        // Footer part
        template = require(`../views/footer.pug`);
        document.write(template({data: footer}));
    }
}
