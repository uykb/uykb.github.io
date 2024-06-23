本文档介绍如何连接SQL Server并通过飞书API发送查询结果。

## 步骤
1. ###### 配置SQL Server:

- 确保SQL Server已启动并且可以通过网络访问。
- 确保你有访问数据库的凭据（用户名和密码）。
2. ###### 准备开发环境:

- 确保安装了一个支持的编程语言及其相应的SQL Server驱动，例如Python与pyodbc库。
3. ###### 获取飞书API凭据:

- 创建一个飞书开发者应用，获取相应的API凭据（如App ID和App Secret）。
4. ###### 编写代码以连接SQL Server并与飞书进行交互:

- 使用编程语言编写代码，连接到SQL Server执行查询。
- 使用飞书API发送或接收消息。

##  配置环境

首先，安装必要的库：

```bash
pip install pyodbc requests
```
## 连接SQL Server并查询数据

    import pyodbc
    
    def query_sql_server(query):
        conn_str = (
            "DRIVER={ODBC Driver 17 for SQL Server};"
            "SERVER=your_server_name;"
            "DATABASE=your_database_name;"
            "UID=your_username;"
            "PWD=your_password"
        )
        conn = pyodbc.connect(conn_str)
        cursor = conn.cursor()
        cursor.execute(query)
        
        columns = [column[0] for column in cursor.description]
        rows = cursor.fetchall()
        
        result = [dict(zip(columns, row)) for row in rows]
        
        cursor.close()
        conn.close()
        
        return result
    
    # 示例查询
    query = "SELECT TOP 10 * FROM your_table_name"
    result = query_sql_server(query)
    print(result)
    

## 与飞书进行交互

```python
import requests
import json

def send_message_to_feishu(message, access_token):
    url = "https://open.feishu.cn/open-apis/message/v4/send/"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }
    payload = {
        "msg_type": "text",
        "content": {
            "text": message
        }
    }
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    return response.json()

# 示例发送消息
access_token = "your_feishu_access_token"
message = "Here is the result of the SQL query:\n" + str(result)
response = send_message_to_feishu(message, access_token)
print(response)

```

##  组合在一起

```python
def main():
    query = "SELECT TOP 10 * FROM your_table_name"
    result = query_sql_server(query)
    message = "Here is the result of the SQL query:\n" + str(result)
    
    access_token = "your_feishu_access_token"
    response = send_message_to_feishu(message, access_token)
    print(response)

if __name__ == "__main__":
    main()

```

请根据自己的实际环境调整连接字符串、查询语句和飞书的API凭据。