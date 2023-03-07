const { verifyToken } = require('../auth/auth');

const validateToken = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  } 
  try { 
    const payload = verifyToken(token);
    // console.log('tokenValidation', payload);
    req.payload = payload;
    next();
    } catch (error) {
      res.status(401).json({
        message: 'Expired or invalid token',
      });
    }
  };

module.exports = validateToken;