const topmenu = require('../jsons/topmenu.json')
const footer = require('../jsons/footer.json')
const solution_list_require = require('./solution_list_require.js')

// Top menu part
let template = require(`../views/topmenu.pug`);
document.write(template({data: topmenu}));

// Content part
let part = require('../jsons/solutions/solution_list.json');
for (let id in part) {
    template = solution_list_require(part[id].widget);
    document.write(template({data: part[id].data}));
}

// Footer part
template = require(`../views/footer.pug`);
document.write(template({data: footer}));
