const express = require('express');
const app = express();
const path = require('node:path');
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

app.set('view engine', 'ejs');
// publicディレクトリ以下のファイルを静的ファイルとして配信
app.use('/static', express.static(path.join(__dirname, 'public')));

const logMiddleware = (req, res, next) => {
  console.log(req.method, req.path);
  next();
}
//下のasnc function main内のパスと同じためこちらが優先されてしまう。
// app.get('/', logMiddleware, (req, res) => {
//   const users = ['alpha', 'beta', 'gamma'];
//   res.render(path.resolve(__dirname, 'views/index.ejs'), { users: users });
// })

app.get('/user/:id', logMiddleware, (req, res) => {
  // :idをreq.params.idとして受け取る
  res.status(200).send(req.params.id);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

// // ポート: 3000でサーバーを起動
// app.listen(3001, () => {
//   // サーバー起動後に呼び出されるCallback
//   console.log('start listening');
// });

async function main() {
  // サーバーのlisten前に接続する
  await client.connect();

  const db = client.db('my-app');

  app.get('/', logMiddleware, async(req,res) =>{
    const users = await db.collection('user').find().toArray();
    console.log(users);
    const names = users.map((user) => {
      return user.name;
    });

    res.render(path.resolve(__dirname, 'views/index.ejs'), {users: names});
  });
  async function inserUser(name){
    if(!name){
      res.status(400)
    }
  }
  app.post('/api/user', express.json(), async (req, res) => {
    const name = req.body.name;
    if (!name) {
      res.status(400).send('Bad Request');
      return;
    }
    await db.collection('user').insertOne({ name: name });
    res.status(200).send('Created');
  });
  // ポート： 3000でサーバーを起動
  app.listen(3000, () => {
    //サーバー起動後に呼び出される
    console.log('start listening');
  });
}
main()
