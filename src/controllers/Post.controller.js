const postService = require('../services/Post.service');
const categoryService = require('../services/Categories.service');
// const userService = require('../services/User.service');

const insertPostWithCategory = async (req, res) => {
// try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.payload;
    // console.log(userId);

    if (!title || !content || !categoryIds) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    const arrHasCategory = categoryIds
      .map(async (categoryId) => categoryService.getCatById(categoryId));

    const hasCategory = await Promise.all(arrHasCategory);

    if (hasCategory.includes(null)) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }
    const post = await postService.insertPost({ title, content, userId, categoryIds });

    return res.status(201).json(post);
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
    if (!byId) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(byId);
  } catch (e) {
    return res.status(500).json({ message: 'internal error', error: e.message });
  }
};

const update = async (req, res) => {
  try { 
    const { id } = req.params;
    const { title, content } = req.body;
    const { id: userId } = req.payload;
    // console.log('updateController', { title, content, id, userId });

    const byId = await postService.getPostById(id);
    if (byId.userId !== userId) return res.status(401).json({ message: 'Unauthorized user' });

    if (!title || !content) {
      return res.status(400).json({ 
        message: 'Some required fields are missing' }); 
    }
    const result = await postService.update({ id, title, content });

    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'internal error', error: e.message });
  }
};
// const removePost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { id: userId } = req.payload;

//     const byId = await postService.getPostById(id);
//     if (byId.userId !== userId) return res.status(401).json({ message: 'Unauthorized user' });

//     if (!byId) return res.status(404).json({ message: 'Post does not exist' });

//     await postService.removePost(id);
//     return res.status(204).end();
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({ message: 'internal error', error: e.message });
// }
// };

module.exports = {
  insertPostWithCategory,
  getAllPosts,
  getPostById,
  update,
  removePost,
};