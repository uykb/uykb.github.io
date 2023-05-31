const HtmlWebpackPlugin = require('html-webpack-plugin')

// The List of index html files that need to be generated.
const htmlfiles = {
    index: [
        {
            entrypoint_id: 'index',
            template: './src/views/template_index.pug',
            output: 'index.html',
            title: '网站首页'
        },
        {
            entrypoint_id: 'about',
            template: './src/views/template_about.pug',
            output: 'about.html',
            title: '关于网站'
        },
        {
            entrypoint_id: 'solutions/solution_list',
            template: './src/views/template_solution.pug',
            output: 'solution_list.html',
            title: '解决方案'
        },
        {
            entrypoint_id: 'products/product_list',
            template: './src/views/template_product.pug',
            output: 'product_list.html',
            title: '产品中心'
        },
        {
            entrypoint_id: 'all_widgets',
            template: './src/views/template_all_widgets.pug',
            output: 'all_widgets.html',
            title: '☀️网页小部件展示☀️'
        }
    ]
}

// Get amount pages of news list
function get_news_list_page_count() {
    try {
        news_summary_json = require('./src/jsons/news/news_list_summary.json')
        if (news_summary_json.maxpagecount > news_summary_json.limitedpagecount)
            return news_summary_json.limitedpagecount
        else
            return news_summary_json.maxpagecount
    }
    catch(e) {
        return 0
    }
}

// Get news list
function get_news_list() {
    try {
        news_list_json = require('./src/jsons/news/news_list.json')
        for (let id in news_list_json) {
            if (news_list_json[id].data.newslist !== undefined) {
                return news_list_json[id].data.newslist
            }
        }
    }
    catch(e) {
        return []
    }
}

// Get solutions list
function get_solutions_list() {
    var rlist = [];

    try {
        solutions_json = require('./src/jsons/solutions/solution_list.json')
        for (let id in solutions_json) {
            if (solutions_json[id].data.id !== undefined && 
                solutions_json[id].data.id !== '') {
                rlist.push(solutions_json[id].data.id);
            }
        }
    }
    catch(e) {
        console.log(e)
    }

    return rlist
}

// Get products list
function get_products_list() {
    var rlist = [];

    try {
        prodcucts_json = require('./src/jsons/products/product_list.json')
        for (let id in prodcucts_json) {
            if (prodcucts_json[id].data.id !== undefined && 
                prodcucts_json[id].data.id !== '') {
                rlist.push(prodcucts_json[id].data.id);
            }
            // If 'data' is an array...
            if (prodcucts_json[id].data instanceof Array) {
                for (let aid in prodcucts_json[id].data) {
                    if (prodcucts_json[id].data[aid].id !== undefined && 
                        prodcucts_json[id].data[aid].id !== '') {
                        rlist.push(prodcucts_json[id].data[aid].id);
                    }
                }
            }
        }
    }
    catch(e) {
        console.log(e)
    }

    return rlist
}

module.exports = {
    Entrypoints: function() {
        var epString = '';

        // ep for htmlfiles.index
        for (var id in htmlfiles.index) {
            epString += `"${htmlfiles.index[id].entrypoint_id}":"./src/${htmlfiles.index[id].entrypoint_id}.js",`;
        }
        // ep for news_list_page_count
        var news_list_page_count = get_news_list_page_count();
        for (id = 1; id <= news_list_page_count; id++) {
            epString += `"news/news_list_${id}":"./src/news/news_list_${id}.js",`;
        }
        // ep for news_list
        var news_list = get_news_list();
        for (id in news_list) {
            epString += `"news/${news_list[id]}":"./src/news/${news_list[id]}.js",`;
        }
        // ep for solutions_list
        var solutions_list = get_solutions_list();
        for (id in solutions_list) {
            epString += `"solutions/${solutions_list[id]}":"./src/solutions/${solutions_list[id]}.js",`;
        }
        // ep for products_list
        var products_list = get_products_list();
        for (id in products_list) {
            epString += `"products/${products_list[id]}":"./src/products/${products_list[id]}.js",`;
        }

        if (epString !== '') {
            epString = epString.slice(0, epString.length-1)
        }

        return JSON.parse(`{${epString}}`)
    },
    Plugins: function() {
        var tempObj;
        var returnList = [];

        // HtmlWebpackPlugin for htmlfiles.index
        for (var id in htmlfiles.index) {
            tempObj = new HtmlWebpackPlugin({
                chunks: [
                  `${htmlfiles.index[id].entrypoint_id}`,
                  'custom-common'
                ],
                favicon: './src/favicon.ico',
                filename: htmlfiles.index[id].output,
                inject: 'body',
                minify: true,
                template: htmlfiles.index[id].template,
                title: htmlfiles.index[id].title
            });
            returnList.push(tempObj);
        }
        // HtmlWebpackPlugin for htmlfiles.news_list (Multi-pages)
        var news_list_page_count = get_news_list_page_count()
        for (id = 1; id <= news_list_page_count; id++) {
            tempObj = new HtmlWebpackPlugin({
                chunks: [
                    `news/news_list_${id}`,
                    'custom-common'
                ],
                favicon: './src/favicon.ico',
                filename: `news_list_${id}.html`,
                inject: 'body',
                minify: true,
                template: './src/views/template_news.pug',
                title: `企业新闻 - 列表 - 第${id}页`
            });
            returnList.push(tempObj);
        }
        // HtmlWebpackPlugin for news_list
        let content = '';
        var news_list = get_news_list();
        for (id in news_list) {
            content = require(`./src/jsons/news/${news_list[id]}.json`);
            tempObj = new HtmlWebpackPlugin({
                chunks: [
                    `news/${news_list[id]}`,
                    'custom-common'
                ],
                favicon: './src/favicon.ico',
                filename: `${news_list[id]}.html`,
                inject: 'body',
                minify: true,
                template: './src/views/template_news.pug',
                title: `企业新闻 - ${content.title}`
            });
            returnList.push(tempObj);
        }
        // HtmlWebpackPlugin for solutions_list
        var solutions_list = get_solutions_list();
        for (id in solutions_list) {
            tempObj = new HtmlWebpackPlugin({
                chunks: [
                    `solutions/${solutions_list[id]}`,
                    'custom-common'
                ],
                favicon: './src/favicon.ico',
                filename: `${solutions_list[id]}.html`,
                inject: 'body',
                minify: true,
                template: './src/views/template_solution.pug',
                title: '解决方案 - 详情页'
            });
            returnList.push(tempObj);
        }
        // HtmlWebpackPlugin for products_list
        var products_list = get_products_list();
        for (id in products_list) {
            tempObj = new HtmlWebpackPlugin({
                chunks: [
                    `products/${products_list[id]}`,
                    'custom-common'
                ],
                favicon: './src/favicon.ico',
                filename: `${products_list[id]}.html`,
                inject: 'body',
                minify: true,
                template: './src/views/template_product.pug',
                title: '产品中心 - 详情页'
            });
            returnList.push(tempObj);
        }

        return returnList
    }
};
