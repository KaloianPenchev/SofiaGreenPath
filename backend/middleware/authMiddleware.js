const jwt = require('jsonwebtoken');
const SECRET_KEY = '121di1hddh112e1d=.apada[dasduasdagd';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    console.log("No token provided in the request.");
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Extracted Token:", token);

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id;
    console.log("Token verified successfully. User ID from token:", req.userId);
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error("Token expired:", error.message);
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }
    if (error.name === 'JsonWebTokenError') {
      console.error("Malformed token:", error.message);
      return res.status(403).json({ message: 'Malformed token' });
    }
    console.error("Token verification failed:", error.message);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
