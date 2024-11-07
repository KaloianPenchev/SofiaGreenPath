// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserService = require('../services/userService');

const SECRET_KEY = '121di1hddh112e1d=.apada[dasduasdagd';

class AuthController {
  static async register(req, res) {
    const { email, username, password } = req.body;
    try {
      const user = await UserService.createUser(email, username, password);
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  }

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
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  }

  static async profile(req, res) {
    try {
      const user = await UserService.findUserById(req.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ username: user.username });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
    }
  }
}

module.exports = AuthController;
