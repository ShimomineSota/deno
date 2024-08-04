## 内容
- jwtの挙動確認用
- denoとhonoで実装

## サーバーの起動
$ cd app
$ deno task start

## 確認方法
1.bodyに{ "username": "user", "password": "pass" }をセットし、"http://localhost:8000/login"にPOST
2.返却されたtokenをBearerTokenにセットし、"http://localhost:8000/protected/data"にGET
3.成功すると、{ message: "🔥This is protected data🔥" }が返却

## server.tsのimportエラー
- キャッシュエラーが起きている場合、ctrl + .でキャッシュする
