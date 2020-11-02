const Joi = require('@hapi/joi');
const User = require('../../models/user.js');

exports.register = async ctx => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(2).max(20).required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // BAD REQUEST
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }
    const user = new User({ username });
    await user.setPassword(password);
    await user.save();

    ctx.body = user.serialize();

    const token = user.generateToken();
    // console.log(ctx);
    ctx.cookies.set('access_token', token, {
      maxAge: 1209600000, //1000 * 60 * 60 * 24 * 14 == 14d
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};
exports.login = async ctx => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      ctx.status = 401; // Unauthorized
      return;
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      ctx.status = 401; // Unauthorized
      return;
    }
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1209600000, //1000 * 60 * 60 * 24 * 14 == 14d
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};
exports.loginCheck = async ctx => {
  const { user } = ctx.state;
  // console.log(ctx);
  if (!user) {
    ctx.status = 401; // Unauthorized
    return;
  }
  ctx.body = user;
};
exports.logout = async ctx => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // NO CONTENT
};
