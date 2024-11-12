const express = require('express');
const AuthController = require('../controllers/authController');
const mockAuthMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', mockAuthMiddleware, AuthController.profile);

module.exports = router;
