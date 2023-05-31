const topmenu = require('./jsons/topmenu.json')
const footer = require('./jsons/footer.json')
const content = require('./jsons/about.json')
const about_require = require('./about_require.js')

// Top menu part
let template = require(`./views/topmenu.pug`);
document.write(template({data: topmenu}));

// Content part
for (let index in content) {
    template = about_require(content[index].widget);
    document.write(template({data: content[index].data}));
}

// Footer part
template = require(`./views/footer.pug`);
document.write(template({data: footer}));
