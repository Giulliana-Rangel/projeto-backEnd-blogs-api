    const { BlogPost, sequelize, PostCategory, Category, User } = require('../models');
  
  const insertPost = async ({ title, content, userId, categoryIds }) => {
    const result = await sequelize.transaction(async (t) => {
      const post = await BlogPost.create({ 
        title, content, userId, published: new Date(), updated: new Date() },
      { transaction: t });
    
      const category = await categoryIds.map(async (categoryId) => PostCategory.create({
        categoryId, postId: post.id,
      }, { transaction: t }));
  
      await Promise.all(category);
  
      return post;
    });
    return result;
  };
  const getAllPosts = async () => {
    const getAll = BlogPost.findAll({
      include: [{ model: Category, as: 'categories', attributes: { exclude: ['PostCategory'] } },
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
    });
    return getAll;
  };

  const getPostById = async (id) => {
  const byId = BlogPost.findOne({
    where: { id },
    include: [{ model: Category, as: 'categories', attributes: { exclude: ['PostCategory'] } },
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ] });
  return byId;
};

const update = async ({ id, title, content }) => {
   // console.log('updateService', { id, title, content });
  await BlogPost.update({ title, content }, { where: { id } });
  const byId = await getPostById(id);
  return byId;
};

  module.exports = {
    insertPost,
    getPostById,
    getAllPosts,
    update,
    
  };
  // find = userId && create = others
