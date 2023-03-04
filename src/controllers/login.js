const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const userService = require('../services/User.service');
require('dotenv/config');

const emailPass = (email, password) => email && password;

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!emailPass(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const user = await userService.login(email, password);

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const { password: _, ...userNoPass } = user.dataValues;

    const token = jwt.sign({ payload: userNoPass }, secret, { algorithm: 'HS256' });

    return res.status(200).json({ user: user.email, token });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'internal error', error: e.message });
  }
};
