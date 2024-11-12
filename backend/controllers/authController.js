const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserService = require('../services/userService');

const SECRET_KEY = 'my_api_19273846_fkapdhedhdurtweqb';

class AuthController {
  static async register(req, res) {
    const { email, username, password } = req.body;
    try {
      const user = await UserService.createUser(email, username, password);
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.status(201).json({ message: 'Потребителят е успешно регистриран', token });
    } catch (error) {
      res.status(500).json({ message: 'Регистрацията не беше успешна', error: error.message });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await UserService.findUserByUsername(username);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Невалидно потребителско име или парола' });
      }
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ message: 'Входът е успешен', token });
    } catch (error) {
      res.status(500).json({ message: 'Грешка при влизане', error: error.message });
    }
  }
  
  static async profile(req, res) {
    try {
      console.log("Извличане на профил за потребител с ID:", req.userId); 
      const user = await UserService.findUserById(req.userId);
      if (!user) return res.status(404).json({ message: 'Потребителят не е намерен' });
      res.json({ username: user.username });
    } catch (error) {
      console.error("Неуспешно извличане на потребителския профил:", error.message);
      res.status(500).json({ message: 'Неуспешно извличане на потребителския профил', error: error.message });
    }
  }
}

module.exports = AuthController;
