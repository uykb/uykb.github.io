'''
    This is a Python3 file.

    Purpose: Generating news list json files which can be used for 'news_list_[n].js' and 'index.js'.

    Usage: python3 autogen_news_list.py
'''
import json, sys, os

# Set work path to the location where this python file is located in.
JSON_WORKPATH = os.path.split(os.path.join(os.getcwd(), sys.argv[0]))[0]
print('>>> CURRENT WORKPATH: %s' % JSON_WORKPATH)

INPUT_INDEX_JSON = os.path.join(JSON_WORKPATH, '../index.json')
INPUT_NEWSLIST_JSON = os.path.join(JSON_WORKPATH, 'news_list.json')
OUTPUT_NEWS_FOR_INDEX_JSON = os.path.join(JSON_WORKPATH, 'news_for_index.json')
OUTPUT_NEWS_LIST_JSON = os.path.join(JSON_WORKPATH, 'news_list_[n].json')
OUTPUT_NEWS_LIST_SUMMARY_JSON = os.path.join(JSON_WORKPATH, 'news_list_summary.json')

# Get property 'news_autolist/maxitems' from file INPUT_INDEX_JSON
try:
    news_maxitems_for_index = 0
    with open(INPUT_INDEX_JSON) as fjson:
        index_json = json.load(fjson)
        for item in index_json:
            if item['widget'].find('news_autolist') >= 0:
                news_maxitems_for_index = item['data']['maxitems']
    print('>>> Property ''news_autolist/maxitems'' in file [{}] is {}.'.format(INPUT_INDEX_JSON, news_maxitems_for_index))
except IOError:
    print('IOError: [%s] Open file failed.' % INPUT_INDEX_JSON)
finally:
    fjson.close()

# Get properties 'news_list_content/newsperpage' and
# 'news_list_content/newslist' from file INPUT_NEWSLIST_JSON
try:
    newsperpage = 0
    newslist = []
    with open(INPUT_NEWSLIST_JSON) as fjson:
        news_list_json = json.load(fjson)
        for item in news_list_json:
            if item['widget'].find('news_list_content') >= 0:
                newsperpage = item['data']['newsperpage']
                jspagecount = item['data']['jspagecount']
                newslist = item['data']['newslist']
    print('>>> Property ''news_list_content/newsperpage'' in file [{}] is {}.'.format(INPUT_NEWSLIST_JSON, newsperpage))
    print('>>> Property ''news_list_content/jspagecount'' in file [{}] is {}.'.format(INPUT_NEWSLIST_JSON, jspagecount))
    print('>>> Length of property ''news_list_content/newslist'' in file [{}] is {}.'.format(INPUT_NEWSLIST_JSON, len(newslist)))
    '''
    id = 0
    for news_id in newslist:
        id += 1
        print('>>> #{:03d} news_id: [{}]'.format(id, news_id))
    '''
except IOError:
    print('IOError: [%s] Open file failed.' % INPUT_NEWSLIST_JSON)
finally:
    fjson.close()

# Generate file OUTPUT_NEWS_FOR_INDEX_JSON
print('>>>')
output_json = []
news_maxitems_for_index = len(newslist) if news_maxitems_for_index > len(newslist) else news_maxitems_for_index
for id in range(news_maxitems_for_index):
    try:
        with open(os.path.join(JSON_WORKPATH, '%s.json' % newslist[id]), 'r', encoding='utf-8') as fin:
            news_json = json.load(fin)
            output_json.append(dict(
                id = newslist[id],
                title = news_json['title'],
                preface = news_json['preface'],
                datetime = news_json['datetime']
            ))
        print('>>> #{}: {{news_id: {}, title: {} ...}} added.'.format(id+1, newslist[id], news_json['title']))
    except IOError:
        print('IOError: [%s.json] Open file failed.' % newslist[id])
    finally:
        fin.close()
try:
    with open(OUTPUT_NEWS_FOR_INDEX_JSON, 'w', encoding='utf-8') as fout:
        json.dump(output_json, fout, ensure_ascii=False, indent=4)
        print('>>> Output file [%s] SUCCEED.' % OUTPUT_NEWS_FOR_INDEX_JSON)
except IOError:
    print('IOError: [%s] write file failed.' % OUTPUT_NEWS_FOR_INDEX_JSON)
finally:
    fout.close()

# Generate file series OUTPUT_NEWS_LIST_JSON
print('>>>')
page_id = 1
id = 0
output_json = []
output_filename = OUTPUT_NEWS_LIST_JSON.replace('[n]', str(page_id))
for newsid in newslist:
    id += 1
    try:
        with open(os.path.join(JSON_WORKPATH, '%s.json' % newsid), 'r', encoding='utf-8') as fin:
            news_json = json.load(fin)
            output_json.append(dict(
                id = newsid,
                title = news_json['title'],
                preface = news_json['preface'],
                datetime = news_json['datetime']
            ))
        print('>>> #{}: {{news_id: {}, title: {} ...}} added.'.format(id, newsid, news_json['title']))
    except IOError:
        print('IOError: [%s.json] Open file failed.' % newsid)
    finally:
        fin.close()
    if (len(output_json) % newsperpage == 0) and (len(output_json) > 0):
        try:
            with open(output_filename, 'w', encoding='utf-8') as fout:
                json.dump(output_json, fout, ensure_ascii=False, indent=4)
                print('>>> Output file [%s] SUCCEED.' % output_filename)
            output_json = []
            page_id += 1
            output_filename = OUTPUT_NEWS_LIST_JSON.replace('[n]', str(page_id))
        except IOError:
            print('IOError: [%s] write file failed.' % output_filename)
        finally:
            print('>>>')
            fout.close()

# Generate last file if output_json still had items
if (len(output_json) > 0):
    try:
        with open(output_filename, 'w', encoding='utf-8') as fout:
            json.dump(output_json, fout, ensure_ascii=False, indent=4)
            print('>>> Output file [%s] SUCCEED.' % output_filename)
        page_id += 1
    except IOError:
        print('IOError: [%s] write file failed.' % output_filename)
    finally:
        print('>>>')
        fout.close()

# Generate summary json file OUTPUT_NEWS_LIST_SUMMARY_JSON
try:
    output_json = dict(
        newscount = len(newslist),
        newsperpage = newsperpage,
        maxpagecount = page_id - 1,
        limitedpagecount = jspagecount
    )
    print('>>> Summary information:')
    print('>>> Property ''newscount'' = {}'.format(output_json['newscount']))
    print('>>> Property ''newsperpage'' = {}'.format(output_json['newsperpage']))
    print('>>> Property ''maxpagecount'' = {}'.format(output_json['maxpagecount']))
    print('>>> Property ''limitedpagecount'' = {}'.format(output_json['limitedpagecount']))

    with open(OUTPUT_NEWS_LIST_SUMMARY_JSON, 'w', encoding='utf-8') as fout:
        json.dump(output_json, fout, ensure_ascii=False, indent=4)
        print('>>> Output file [%s] SUCCEED.' % OUTPUT_NEWS_LIST_SUMMARY_JSON)
except IOError:
    print('IOError: [%s] write file failed.' % OUTPUT_NEWS_LIST_SUMMARY_JSON)
finally:
    fout.close()
