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
            // Manipulate layout '_AB_content'.
            if (content[id].widget.search(/_AB_content/) > 0) {
                let shortcut_list = [];
                let html_content = '';
                for (let subid in content[id].data) {
                    template = product_require(content[id].data[subid].widget);
                    if (content[id].data[subid].widget.search(/_AB_tag/) > 0) {
                        shortcut_list.push(content[id].data[subid].data);
                    }
                    html_content += template({data: content[id].data[subid].data});
                }
                template = product_require(content[id].widget);
                document.write(template({data: {menu: shortcut_list, htmlcontent:html_content}}));
            } else {
                template = product_require(content[id].widget);
                document.write(template({data: content[id].data}));
            }
        }

        // Footer part
        template = require(`../views/footer.pug`);
        document.write(template({data: footer}));
    }
}
