# Record

## lookup


**Endpoint**

```
GET /lookup
```


**Request Parameters**

| Key | Required | Description |
| --- | -------- | ----------- |
| col1 | col2 | col3 |

## 删除DNS资源记录


**Endpoint**

```
DELETE /resource-record/:id
```

``` curl
curl --location --request DELETE '{dns-api-host}/resource-record/60a241d9b63d09d5b6f0b5bd' 
```

``` json
{
    "code": 0,
    "msg": "成功",
    "data": {}
}
```

## 获取配置项


**Endpoint**

```
GET /config
```

```curl
curl --location --request GET '{dns-api-host}/resource-records/config'
```

```json
{
    "code": 0,
    "msg": "成功",
    "data": {
        "min_ttl": 60,
        "max_ttl": 86400,
        "min_priority": 0,
        "max_priority": 65535
    }
}
```

## 解析（无需对接）


**Endpoint**

```
GET /resolve
```

```curl
curl --location --request GET '{dns-api-host}/resolve?name=foreverland.xyz&type=1'
```

```json
{
    "code": 0,
    "msg": "成功",
    "data": {
        "list": [
            {
                "name": "@",
                "domain": "foreverland.xyz",
                "value": "8.8.8.8",
                "ttl": 60
            }
        ]
    }
}
```


**Request Parameters**

| Key | Required | Description |
| --- | -------- | ----------- |
| col1 | col2 | col3 |

## 资源记录冲突检查


**Endpoint**

```
GET /resource-records/conflict
```

该为创建和修改的前置检查接口
```curl
curl --location --request GET '{dns-api-host}/resource-records/conflict?name=@&type=CNAME&domain=foreverland.xyz'
```

```json
{
    "code": 0,
    "msg": "成功",
    "data": {
        "has_conflict": true,
        "list": [
            {
                "id": "60a74975c11f8dbc3aae11c9",
                "domain": "foreverland.xyz",
                "name": "@",
                "type": "A"
            }
        ]
    }
}
```


**Request Parameters**

| Key | Required | Description |
| --- | -------- | ----------- |
| col1 | col2 | col3 |

## 修改DNS资源记录


**Endpoint**

```
PUT /resource-record/:id
```

#### 参数规则参考创建接口

``` curl
curl --location --request PUT '{dns-api-host}/resource-record/60a241d9b63d09d5b6f0b5bd' \
--header 'Content-Type: application/json' \
--data-raw '{
    "domain": "foreverland.xyz",
    "name": "@",
    "type": "A",
    "value": "8.8.4.4",
    "ttl": 600,
    "priorty": 10
}'
```

``` json
{
    "code": 0,
    "msg": "成功",
    "data": {}
}
```

## 创建DNS资源记录


**Endpoint**

```
POST /resource-records
```

#### 请求参数 name

* 参数验证规则
字符串完全匹配 **@** 或者 \*\*\*\*\*
\*只允许在首位、和"\*"后面只允许跟"\."
值不能以\“."、\“-"开头或结尾 主机记录（RR）值不能以"符号"单独存在。 主机记录（RR）值不能有连续的"."。 .分割的每个字符串长度不能超过63字符
其他可用字符a-z、A-Z、0-9、'-' 、'_' 、'.'
* 剔除掉 \*\.和@和\*以后可使用正则进行验证

```
^([a-zA-Z0-9_]{1}[a-zA-Z0-9_-]{0,62}){1}(\\.[a-zA-Z0-9_]{1}[a-zA-Z0-9_-]{0,62})*[\\._]?$
```

#### 请求参数 value

* value是必填的可变参数 跟随type变化

| 记录类型 | 值类型 | 值 |
| :--- | --- | --- |
| A | String | IPV4 Address |
| AAAA | String | IPV6 Address |
| CNAME | String | 域名 |
| MX | String | 域名 |
| TXT | String | 长度最大为512位的文本 |
| SRV | Object {<br>"port": 5050,<br>"weight": 10,<br>"target": "foreverland.xyz"<br>} | port 端口号 uint16<br>weight 权重 uint16<br>target 目标地址 域名 |
| CAA | Object {<br>"flags": 0,<br>"tag": "issue"<br>"value": ""example.com""<br>} | flags 认证机构限制标志 值为0或128<br>tag 证书属性标签 ^[a-z0-9]{1,15}$ <br>value 证书颁发机构域名、策略违规报告邮件地址等信息 例 "example.com" / "ca.example.com" / "mailto:mailto:admin@example.com" 验证规则: ^"[0-9a-zA-Z*-_~=:;.@+/! ^?]{1,235}"$ |

``` curl
curl --location --request POST '{dns-api-host}/resource-records' \
--header 'Content-Type: application/json' \
--data-raw '{
    "domain": "foreverland.xyz",
    "name": "@",
    "type": "A",
    "value": "8.8.8.8",
    "ttl": 60,
    "priorty": 10
}'
```

``` json
{
    "code": 0,
    "msg": "成功",
    "data": {
        "id": "60a230ace65f30eeb2c497a8"
    }
}
```

## 获取单条资源记录


**Endpoint**

```
GET /resource-record/:id
```

``` curl
curl --location --request GET '{dns_api_host}/resource-record/609e2e53128ed1de2c981005'
```

``` json
{
    "code": 0,
    "msg": "成功",
    "data": {
        "id": "609e2e53128ed1de2c981005",
        "domain": "vw.xyz",
        "name": "@",
        "type": "SRV",
        "value": {
            "weight": 1,
            "port": 5000,
            "target": "baidu.com"
        },
        "value_view": "0 1 5000 baidu.com",
        "ttl": 60,
        "priority": 0,
        "created_at": 1620979283,
        "updated_at": 1620979283
    }
}
```

## 获取资源记录列表


**Endpoint**

```
GET /resource-records
```

``` curl
curl --location --request GET '{dns-api-host}/resource-records?page_num=1&page_size=20&domain=example.com'
```

``` json
{
    "code": 0,
    "msg": "成功",
    "data": {
        "list": [
            {
                "id": "60a22fdae65f30eeb2c497a7",
                "domain": "example.com",
                "name": "@",
                "type": "A",
                "value": "8.8.8.8",
                "value_view": "8.8.8.8",
                "ttl": 60,
                "priority": 0,
                "created_at": 1621241818,
                "updated_at": 1621241818
            },
            {
                "id": "609e2e53128ed1de2c981005",
                "domain": "example.com",
                "name": "@",
                "type": "SRV",
                "value": {
                    "weight": 1,
                    "port": 5000,
                    "target": "baidu.com"
                },
                "value_view": "0 1 5000 server.example.com",
                "ttl": 60,
                "priority": 0,
                "created_at": 1620979283,
                "updated_at": 1620979283
            }
        ],
        "page": {
            "total_page": 1,
            "current_page": 1,
            "count": 2
        }
    }
}
```


**Request Parameters**

| Key | Required | Description |
| --- | -------- | ----------- |
| col1 | col2 | col3 |
