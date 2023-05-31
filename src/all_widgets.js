const content = require('./jsons/all_widgets.json')
const all_widgets_require = require('./all_widgets_require.js')

// All Widgets Sample
for (var index in content) {
    var template = all_widgets_require(content[index].widget);
    document.write(template({data: content[index].data}));
}
