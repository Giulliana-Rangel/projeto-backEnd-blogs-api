const userService = require('../services/User.service');
const { createToken } = require('../auth/auth');

const createNewUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  
  const hasEmail = await userService.checkEmail(email);
  if (hasEmail) {
    return res.status(409).json({ message: 'User already registered' });
  }
  
  const payload = createToken({ displayName, email });
  // console.log(payload);
  
   await userService.createNewUser({
    displayName,
    email, 
    password, 
    image,
    userId: payload.id, 
  });

  return res.status(201).json({ token: payload });
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

  const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
    
      const byId = await userService.getUserById(id);
      if (!byId) return res.status(404).json({ message: 'User does not exist' });
      return res.status(200).json(byId);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'internal error', error: e.message });
    }
  };

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
};