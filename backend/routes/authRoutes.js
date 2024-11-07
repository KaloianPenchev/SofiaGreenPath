// routes/authRoutes.js
const express = require('express');
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', authMiddleware, AuthController.profile); // Protected route

module.exports = router;
