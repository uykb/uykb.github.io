### 第1步，维护新闻列表JSON文件。

修改 **src/jsons/news/news_list.json文件**，在其 **data.newslist** 数组中，新增（或删除）新闻的 **文件名称代码**（**newsid**，如“news_20190500”）。该代码表示将生成（或删除）新闻列表页面中的新闻链接。

### 第2步，创建新闻内容JSON文件。

以新闻的文件名称代码（**newsid**）在 **src/jsons/news/目录** 中建立新闻内容文件（格式为： **[newsid].json**，如“news_20190500.json”，可采用复制/粘帖方法建立新文件）。修改其中的新闻标题，时间，简介及内容。

### 第3步，维护新闻内容JS文件。

对应 **src/jsons/news/news_list.json文件**，在其 **data.newslist** 的数组元素，修改 **src/news/目录** 中相应的 **[newsid].js文件**。

### 第4步，运行脚本，自动生成新闻列表页面JSON文件和可供发布的（dist/目录下）项目全部HTML文件。

在命令行中输入npm脚本运行命令：

```bash
$ npm run build
```

即可**自动**完成以下操作：

- 生成对应首页的新闻列表JSON文件 **news_for_index.json**。

- 生成对应各个新闻列表页面的JSON文件 **news_list_[n].json**（n = 1,2,3...）。

- 生成页面生成的新闻列表概要文件 **news_list_summary.json**。

- 生成 **dist/目录** 下的所有HTML文件。

**注：新闻内容中的所有图片文件，直接保存在dist/assets/imgs/news/目录中为宜。**


***


*Change Log:*

- 14 Nov 2019, 对本项目进行优化后，升级至0.4.x版本，相应修改本文档。

- 12 Jul 2019, 项目稳定至0.3.x版本，完成本文档。
