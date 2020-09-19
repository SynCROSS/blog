let postId = 1;

const posts = [
  {
    id: 1,
    title: 'Title',
    body: 'Context',
  },
];

// export const write = ctx => {
exports.write = ctx => {
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

// export const list = ctx => {
exports.list = ctx => {
  ctx.body = posts;
};

// export const read = ctx => {
exports.read = ctx => {
  const { id } = ctx.params;
  const post = posts.find(p => p.id.toString() === id);
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: 'This Post is not exist.',
    };
    return;
  }
  ctx.body = post;
};

// export const remove = ctx => {
exports.remove = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'This Post is not exist.',
    };
    return;
  }
  posts.splice(index, 1);
  ctx.status = 204; // NO CONTENT
};

// export const replace = ctx => {
exports.replace = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'This Post is not exist.',
    };
    return;
  }
  posts[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

// export const update = ctx => {
exports.update = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'This Post is not exist.',
    };
    return;
  }
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};
