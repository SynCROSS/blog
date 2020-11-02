// import Router from 'koa-router';
// import * as postsCtrl from './posts.ctrl';
const Router = require('koa-router');
const postCtrl = require('./posts.ctrl');
const checkLoggedIn = require('../../lib/checkLoggedIn');

const posts = new Router();

// const printInfo = (ctx) => {
//   ctx.body = {
//     method: ctx.method,
//     path: ctx.path,
//     params: ctx.params,
//   };
// };

posts.get('/', postCtrl.list);
posts.post('/', checkLoggedIn, postCtrl.write);

const post = new Router(); // /api/posts/:id

post.get('/', postCtrl.read);
post.delete('/', checkLoggedIn, postCtrl.checkOwnPost, postCtrl.remove);
post.patch('/', checkLoggedIn, postCtrl.checkOwnPost, postCtrl.update);

// posts.get('/:id', postCtrl.checkObjectId, postCtrl.read);
// posts.delete('/:id', postCtrl.checkObjectId, postCtrl.remove);
// // posts.put('/:id', postCtrl.replace);
// posts.patch('/:id', postCtrl.checkObjectId, postCtrl.update);

posts.use('/:id', postCtrl.getPostById, post.routes());

// posts.get('/', printInfo);
// posts.post('/', printInfo);
// posts.get('/:id', printInfo);
// posts.delete('/:id', printInfo);
// posts.put('/:id', printInfo);
// posts.patch('/:id', printInfo);

// export default posts;
module.exports = posts;
