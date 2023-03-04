const jwt = require('jsonwebtoken');
const userService = require('../services/User.service');

const secret = process.env.JWT_SECRET;
// const jwtConfig = {
//   expiresIn: '10d',
//   algorithm: 'HS256',
// };

const createNewUser = async (req, res) => {
  const { authorization } = req.headers;
  const { displayName, email, password, image } = req.body;
  
  const hasEmail = await userService.checkEmail(email);
  if (hasEmail) {
    return res.status(409).json({ message: 'User already registered' });
  }
  
  const payload = jwt.verify(authorization, secret);
  console.log(payload);
  
   await userService.createNewUser({
    displayName,
    email, 
    password, 
    image,
    userId: payload.id, 
  });

  return res.status(201).json({ authorization });
};

// const createNewUser = async (req, res) => {
//   const { displayName, email, password, image } = req.body;

//   const response = await userService.createNewUser(displayName, email, password, image);

//   const newUserId = response.dataValues.id;
//   const token = jwt.sign({ data: { userId: newUserId } }, secret, jwtConfig);
//   res.status(201).send({ token });
// };
module.exports = {
  createNewUser,
};