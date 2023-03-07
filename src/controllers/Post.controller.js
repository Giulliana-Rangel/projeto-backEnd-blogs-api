const postService = require('../services/Post.service');
const categoryService = require('../services/Categories.service');
const userService = require('../services/User.service');

const insertPostWithCategory = async (req, res) => {
// try {
    const { title, content, categoryIds } = req.body;
    const { userId } = req.user;

    if (!title || !content || !categoryIds) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    const hasCategory = await categoryService.getCatById(categoryIds);
    if (hasCategory !== null) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }
    const post = await postService.insertPost({ title, content, userId, categoryIds });

    return res.status(201).json({ message: post });
  // } catch (e) {
  //   return res.status(500).json({ message: 'unexpected error', error: e.message });
  // }
};

const getAllPosts = async (_req, res) => {
  try {
    const getAll = await postService.getAllPosts();
    return res.status(200).json(getAll);
  } catch (e) {
    return res.status(500).json({ message: 'internal error', error: e.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const byId = await postService.getPostById(id);
    return res.status(200).json(byId);
  } catch (e) {
    return res.status(404).json({ message: 'Post does not exist', error: e.message });
  }
};

module.exports = {
  insertPostWithCategory,
  getAllPosts,
  getPostById,
};