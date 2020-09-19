const Post = require('../../models/post');
const mongoose = require('C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/mongoose');
const Joi = require('C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/@hapi/joi');
const sanitizeHTML = require('C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/sanitize-html');

const { ObjectId } = mongoose.Types;

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

exports.getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // BAD REQUEST
    return;
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      ctx.status = 404; // NOT FOUND
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// const write = (ctx) => {};
// const list = (ctx) => {};
// const read = (ctx) => {};
// const remove = (ctx) => {};
// const update = (ctx) => {};

exports.write = async ctx => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });

  // const result = Joi.assert(ctx.request.body, schema);
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // BAD REQUEST
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body: sanitizeHTML(body, sanitizeOption),
    tags,
    user: ctx.state.user,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

const filterTextAndHTML = body => {
  const filtered = sanitizeHTML(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

exports.list = async ctx => {
  // Because query is String type.
  // So It have to convert string type
  // into numbers to calculate page number.
  const pageLimit = 10;
  const page = parseInt(ctx.query.page || '1', 10);
  if (page < 1) {
    ctx.status = 400; // BAD REQUEST
    return;
  }
  const { tag, username } = ctx.query;
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };
  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(pageLimit)
      .skip((page - 1) * 10)
      .lean() // lean() function makes data JSON type from beginning
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount / pageLimit));
    ctx.body = posts.map(post => {
      return {
        ...post,
        body: filterTextAndHTML(post.body),
        // post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
      };
    });
    // ctx.body = posts
    //   .map(post => post.toJSON())
    //   .map(post => {
    //     return {
    //       ...post,
    //       body:
    //         post.body.length < 200
    //           ? post.body
    //           : `${post.body.slice(0, 200)}...`,
    //     };
    //   });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.read = ctx => {
  // exports.read = async ctx => {
  ctx.body = ctx.state.post;
  /* const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404; // NOT FOUND
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  } */
};

exports.remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // NO CONTENT
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.update = async ctx => {
  const { id } = ctx.params;
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // BAD REQUEST
    ctx.body = result.error;
    return;
  }
  const nextData = { ...ctx.request.body };
  if (nextData.body) {
    nextData.body = sanitizeHTML(nextData.body, sanitizeOption);
  }

  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      // const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    if (!post) {
      ctx.status = 404; // NOT FOUND
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403; // FORBIDDEN
    return;
  }
  return next();
};
