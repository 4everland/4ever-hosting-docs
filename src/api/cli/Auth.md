# Auth

## cli-user-login

### Endpoint

```
POST /login
```

### Request Headers

| name | value | required |
| ---- | ----- | -------- |
| Content-Type | application/x-www-form-urlencoded | true |
| Accept-Version | 1.0 | true |
| token |  | true |

### curl

```
curl -L -X POST 'https://cli.4everland.org/login' \
-H 'Accept-Version: 1.0' \
-H 'token: xxxx'
```

### response

```
{
    "code": 200,
    "message": "",
    "bcode": 10,
    "content": {
        "token": "callback-token"
    }
}
```
