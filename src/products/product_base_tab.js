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
            // Manipulate layout '_tabs_content'.
            if (content[id].widget.search(/_tabs_content/) > 0) {
                let tabsdata = [];
                for (let tabid in content[id].data) {
                    let html_content = '';
                    for (let id2 in content[id].data[tabid].tabdata) {
                        template = product_require(content[id].data[tabid].tabdata[id2].widget);
                        html_content += template({data: content[id].data[tabid].tabdata[id2].data});
                    }
                    tabsdata.push({tabname: content[id].data[tabid].tabname, tabhtml: html_content});
                }
                template = product_require(content[id].widget);
                document.write(template({data: tabsdata}));
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
