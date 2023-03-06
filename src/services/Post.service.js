const { BlogPost } = require('../models');

const createBlogPost = async ({ title, content, userId, published, updated }) => {
const blogPost = await BlogPost.findOrcreate({ 
  where: userId,
  defaults: {
    title, content, published, updated,
  },
});
return blogPost;
};

module.exports = createBlogPost;

// find = userId && create = others