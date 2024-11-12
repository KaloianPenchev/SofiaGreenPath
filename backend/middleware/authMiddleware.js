const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my_api_19273846_fkapdhedhdurtweqb';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    console.error("No token provided");
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(403).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
