const Router = require('C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/koa-router');
const authCtrl = require('./auth.ctrl');

const auth = new Router();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.loginCheck);
auth.post('/logout', authCtrl.logout);

module.exports = auth;
