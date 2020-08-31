const Koa = require('C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/koa');

const app = new Koa();

app.use((ctx) => {
  ctx.body = 'hello Koa';
});

app.listen(4000, () => {
  console.log('Server is Listening to port 4000');
});
