# hosei-webservice
## 作成したソフトウェアについて

　このソフトウェアは自分のタスクを管理するためのものである。自分のタスクとともに、そのタスクをこなす時間を入力することで、自らの行動を整理することができる。

## 使い方

dockerを使ってmongoDBを起動する

```bash
$ docker run --rm --name=my-app-db -p 27017:27017 mongo
```

serverを起動する

```bash
$ npm install
$ node index.js
```
http://localhost:3000 にアクセスする。
ブラウザ上のテキストフィールドに自分のタスクを入力し、各セレクトボックスから、そのタスクの制限時間を入力する。最後に追加ボタンを押す。


