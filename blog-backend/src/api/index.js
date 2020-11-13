// import Router from 'koa-router';
const Router = require('koa-router');
// import posts from './posts';
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
