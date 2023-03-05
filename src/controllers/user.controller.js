const jwt = require('jsonwebtoken');
const userService = require('../services/User.service');

const secret = process.env.JWT_SECRET;

const createNewUser = async (req, res) => {
  const { authorization } = req.headers;
  const { displayName, email, password, image } = req.body;
  
  const hasEmail = await userService.checkEmail(email);
  if (hasEmail) {
    return res.status(409).json({ message: 'User already registered' });
  }
  
  const payload = jwt.verify(authorization, secret);
  // console.log(payload);
  
   await userService.createNewUser({
    displayName,
    email, 
    password, 
    image,
    userId: payload.id, 
  });

  return res.status(201).json({ authorization });
};

 const getAllUsers = async (_req, res) => {
   try {
    const allUsers = await userService.getAllUsers();
    if (!allUsers) throw Error;
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({
      message: 'internal error',
      error: err.message,
    });
  }
  };

module.exports = {
  createNewUser,
  getAllUsers,
};