// routes/authRoutes.js
const express = require('express');
const AuthController = require('../controllers/authController.js');
const router = express.Router();

router.post('/register', AuthController.register); 
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/profile', AuthController.profile); 

module.exports = router;
