const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(401).json({ success: false, message: 'Invalid token.' });
  }
};
