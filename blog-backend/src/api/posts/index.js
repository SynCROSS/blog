// import Router from 'koa-router';
const Router = require('koa-router');
// import * as postsCtrl from './posts.ctrl';
const postCtrl = require('./posts.ctrl');
const checkLoggedIn = require('../../lib/checkLoggedIn');

const posts = new Router();

posts.get('/', postCtrl.list);
posts.post('/', checkLoggedIn, postCtrl.write);

const post = new Router(); // /api/posts/:id

post.get('/', postCtrl.read);
post.delete('/', checkLoggedIn, postCtrl.checkOwnPost, postCtrl.remove);
post.patch('/', checkLoggedIn, postCtrl.checkOwnPost, postCtrl.update);

posts.use('/:id', postCtrl.getPostById, post.routes());

// export default posts;
module.exports = posts;
