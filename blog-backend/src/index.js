// const u5e = require('abrequire');s
require('C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/dotenv').config();
// const url = require('url');
// const Koa = import(
//   url.pathToFileURL(
//     'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/koa-router'
//   )
// );

// import Koa from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/koa';
// import Router from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/koa-router';
// import bodyparser from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/koa-bodyparser';
// import mongoose from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/mongoose';

const Koa = require('C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/koa');
const Router = require('C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/koa-router');
const bodyParser = require('C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/koa-bodyparser');
const mongoose = require('C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/mongoose');
const serve = require('C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/koa-static');
const path = require('path');
const send = require('C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/koa-send');

// import api from './api';
const api = require('./api');
const jwtMiddleware = require('./lib/jwtMiddleware');
// Testing for data injection(?)
// const createFakeData = require('./createFakeData');

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB');
    // createFakeData();
  })
  .catch(e => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);
// koaRouter.get('/', (ctx) => {
//   ctx.body = 'Home';
// });

// koaRouter.get('/about/:name?', (ctx) => {
//   const { name } = ctx.params;
//   ctx.body = name ? `About ${name}` : 'About';
// });

// koaRouter.get('/posts', (ctx) => {
//   const { id } = ctx.query;
//   ctx.body = id ? `Posts #${id}` : 'This Post id is not exist';
// });

app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../../blog-frontend/build');
app.use(serve(buildDirectory));
app.use(async ctx => {
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    await send(ctx, 'index.html', { root: buildDirectory });
  }
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Server is Listening to port %d', port);
});
// app.use(async (ctx, next) => {
//   console.log(ctx.url);
//   console.log(1);
//   if (ctx.query.authorized !== '1') {
//     ctx.status = 401;
//     return;
//   }
//   // next().then(() => {
//   //   console.log('END');
//   // });
//   await next();
//   console.log('END');
// });

// app.use((ctx, next) => {
//   console.log(2);
//   next();
// });

// app.use((ctx) => {
//   ctx.body = 'Hello Koa';
// });

// app.listen(4000, () => {
//   console.log('Server is Listening to port 4000');
// });
