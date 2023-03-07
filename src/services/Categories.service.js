const { Category } = require('../models');

const createCategories = async ({ name }) => {
  const categories = await Category.create({ name });
  return categories;
}; 

const getAllCat = async () => {
  const allCat = await Category.findAll();
  return allCat;
};

const getCatById = async (id) => {
  const byId = await Category.findOne({ where: { id } });
  return byId;
};

module.exports = {
  createCategories,
  getAllCat,
  getCatById,
}; 