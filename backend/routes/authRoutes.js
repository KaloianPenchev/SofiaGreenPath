// routes/authRoutes.js
const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();

router.post('/register', AuthController.register); // Registration route
router.post('/login', AuthController.login); // Login route

module.exports = router;
