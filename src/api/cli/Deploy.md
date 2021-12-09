# Deploy

## cli-user-deploy

### Endpoint

```
POST /deploy
```

### Request Headers

| name | value | required |
| ---- | ----- | -------- |
| Content-Type | multipart/form-data | true |
| Accept-Version | 1.0 | true |
| token |  | true |

### Request Body

| name | type | required |
| ---- | ---- | -------- |
| file | file | true |
| projectId | text | true |

### curl:

```
curl -L -X POST 'https://cli.4everland.org/deploy' \
-H 'token:eyJ0eXAiOiJKV1QiLCJhbGc***tx60gDRzH37majqSgZ2dg' \
-H 'Accept-Version: 1.0' \
-F 'file=@"/path/to/ipfs.zip"'
-F 'projectId=61a6e990***01344792'
```

### response:

```
{
    "code":200,
    "message":"",
    "bcode":10,
    "content":{
        "domainList":[
            "domain-a.com",
            "domain-b.com",
            "domain-c.com"
        ],
        "fileHash":"ababababFababiableababHabasababh"
    }
}
```
