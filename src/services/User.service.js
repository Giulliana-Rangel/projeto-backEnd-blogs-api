const { User } = require('../models');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  return user;
};

const createNewUser = async ({ displayName, email, password, image }) => {
  const create = await User.create({ displayName, email, password, image });
  return create;
};

const checkEmail = async (email) => {
  const emailUser = await User.findOne({ where: { email } });
  return emailUser;
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
  return allUsers;
};

module.exports = {
  login,
  createNewUser,
  checkEmail,
  getAllUsers,
};