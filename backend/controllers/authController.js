// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserService = require('../services/userService');

const SECRET_KEY = '121di1hddh112e1d=.apada[dasduasdagd';

class AuthController {
  // Registration logic
  static async register(req, res) {
    const { email, username, password } = req.body;
    try {
      console.log("Register endpoint called with data:", { email, username });

      const user = await UserService.createUser(email, username, password);
      console.log("User successfully created:", user.id);

      res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        // Specific error for duplicate email/username
        const message = error.errors[0].message.includes('email') 
          ? 'Email already in use' 
          : 'Username already in use';
        console.error("Registration error:", message);
        return res.status(400).json({ message });
      }
      console.error("Error in AuthController.register:", error.message);
      res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  }

  // Login logic
  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await UserService.findUserByUsername(username);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error("Error in AuthController.login:", error.message);
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  }
}

module.exports = AuthController;
