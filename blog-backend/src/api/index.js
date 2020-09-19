// import Router from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/koa-router';
// import posts from './posts';
const Router = require('C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/koa-router');
const posts = require('./posts');
const auth = require('./auth');

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());

api.get('/test', ctx => {
  ctx.body = 'Test is successfully done.';
});

// export default api;
module.exports = api;
