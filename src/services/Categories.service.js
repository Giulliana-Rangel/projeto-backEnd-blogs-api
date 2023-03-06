const { Category } = require('../models');

const createCategories = async ({ name }) => {
  const categories = await Category.create({ name });
  return categories;
}; 

const getAllCat = async () => {
  const allCat = await Category.findAll();
  return allCat;
};

module.exports = {
  createCategories,
  getAllCat,
}; 