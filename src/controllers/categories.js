const categoriesService = require('../services/Categories.service');

const createCategories = async (req, res) => {
  const { name } = req.body;
  if (!name || name.length < 1) return res.status(400).json({ message: '"name" is required' });
  try {
    const categories = await categoriesService.createCategories({
      name,
    });
    return res.status(201).json(categories);
  } catch (e) {
    return res.status(500).json({ message: 'internal error', error: e.message });
  }
};

const getAllCat = async (_req, res) => {
  try {
    const allCat = await categoriesService.getAllCat();
    return res.status(200).json(allCat);
  } catch (e) {
    return res.status(500).json({ message: 'internal error', error: e.message });
  }
};

module.exports = {
  createCategories,
  getAllCat,
};