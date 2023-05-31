const topmenu = require('./jsons/topmenu.json')
const footer = require('./jsons/footer.json')
const content = require('./jsons/index.json')
const index_require = require('./index_require.js')

// Top menu part
let template = require(`./views/topmenu.pug`);
document.write(template({data: topmenu}));

// Content part
for (let index in content) {
    // Manipulate widget 'news_autolist'.
    if (content[index].widget.search(/news_autolist/i) >= 0) {
        let newslistjson = require('./jsons/news/news_list.json');
        for (let id in newslistjson) {
            if (newslistjson[id].data.newslist !== undefined) {
                content[index].data.newslist = [];
                let newsforindex = require('./jsons/news/news_for_index.json');
                for (let newsid in newsforindex) {
                    content[index].data.newslist.push(
                        {
                            id: newsforindex[newsid].id,
                            title: newsforindex[newsid].title,
                            preface: newsforindex[newsid].preface,
                            datetime: newsforindex[newsid].datetime
                        }
                    );
                }
            }
        }
    } 
    template = index_require(content[index].widget);
    document.write(template({data: content[index].data}));
}

// Footer part
template = require(`./views/footer.pug`);
document.write(template({data: footer}));
