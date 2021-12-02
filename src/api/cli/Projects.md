# Projects

## cli-user-create-remote-project

### Endpoint

```
POST /project
```

### Request Headers

| name | value | required |
| ---- | ----- | -------- |
| Content-Type | application/x-www-form-urlencoded | true |
| Accept-Version | 1.0 | true |
| token |  | true |

### Request Body

| name | type | required |
| ---- | ---- | -------- |
| projectName | text | true |

### curl:

```
curl -L -X POST 'https://cli.4everland.org/project' \
-H 'Accept-Version: 1.0' \
-H 'token: xxx' \
-F 'projectName="cli"'
```

### response:

```
{
    "code": 200,
    "message": "",
    "bcode": 10,
    "content": {
        "projectId": "pCrhSaroatcrjtierencgt"
    }
}
```

## cli-user-project-list

### Endpoint

```
GET /project/{page}
```

### Request Headers

| name | value | required |
| ---- | ----- | -------- |
| token |  | true |
| Accept-Version | 1.0 | true |

### Request Query

| name | required | desc |
| ---- | -------- | ---- |
| pageSize | true | 单页长度，默认10 |

### curl:

```
curl -L -X GET 'https://cli.4everland.org/project/1' \
-H 'Accept-Version: 1.0' \
-H 'token: xxx'
```

### response:

```
{
    "code": 200,
    "message": "",
    "bcode": 10,
    "content": {
        "count": 20,
        "list": [
            {
                "name": "a-project",
                "isCli": false,
                "projectId": "pCrHhaaroajeschcttIedr",
                "createAt": 1234567890
            }
        ]
    }
}
```
