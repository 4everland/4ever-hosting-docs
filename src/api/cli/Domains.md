# Domains

## cli-user-domain-add

### Endpoint

```
POST /domain/{projectId}
```

### Request Headers

| name | value | required |
| ---- | ----- | -------- |
| Content-Type | application/json | true |
| Accept-Version | 1.0 | true |
| token |  | true |

### Request Body

| name | type | required |
| ---- | ---- | -------- |
| domain | text | true |

### curl:

```
curl -L -X POST 'https://cli.4everland.org/domain/618b24***47ed0' \
-H 'Accept-Version: 1.0' \
-H 'token:eyJ0eXAiOiJKV1QiLCJhbGc***tx60gDRzH37majqSgZ2dg' \
-H 'Content-Type: application/json' \
--data-raw '{"domain":"www.forev***and.org"}'
```

### response:

```
{
    "code":200,
    "message":"",
    "bcode":10,
    "content":{
        "domainId":"dCHomharainIaacdteshr"
    }
}
```

## cli-user-domain-check

### Endpoint

```
GET /domain/examination
```

### Request Headers

| name | value | required |
| ---- | ----- | -------- |
| Accept-Version | 1.0 | true |
| token |  | true |

### Request Query

| name | required | desc |
| ---- | -------- | ---- |
| domainId | true | from cli-user-domain-list.content.list[].domainId |

### curl:

```
curl -L -X GET 'https://cli.4everland.org/domain/examination?domainId=618d0108***1f5fdc4' \
-H 'Accept-Version: 1.0' \
-H 'token:eyJ0eXAiOiJKV1QiLCJhbGc***tx60gDRzH37majqSgZ2dg'
```

### response:

```
{
    "code": 200,
    "message": "",
    "bcode": 10,
    "content": {
        "Success": false
    }
}
```

## cli-user-domain-list

### Endpoint

```
GET /domain/{page}
```

### Request Headers

| name | value | required |
| ---- | ----- | -------- |
| Accept-Version | 1.0 | true |
| token |  | true |

### Request Query

| name | required | desc |
| ---- | -------- | ---- |
| pageSize | true | Size of single page, should not exceeded 15 |

### curl:

```
curl -L -X GET 'https://cli.4everland.org/domain/1?pageSize=10' \
-H 'Accept-Version: 1.0' \
-H 'token:eyJ0eXAiOiJKV1QiLCJhbGc***tx60gDRzH37majqSgZ2dg'
```

### response:

```
{
    "code": 200,
    "message": "",
    "bcode": 10,
    "content": {
        "domainList": [
            {
                "valid": false,
                "domain": "www.domain.com",
                "domainName": "domain.com",
                "certificate": false,
                "nameServers": "THIRD_PARTY",
                "projectName": "a-project",
                "projectId": "prCohaHr***theIrd",
                "createAt": 1234567890,
                "domainId": "CdhaHomraaiacsnthIedr"
            }
        ],
        "count": 1
    }
}
```
