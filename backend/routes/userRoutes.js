// routes/userRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const UserService = require('../services/userService');

const router = express.Router();

router.get('/recentSearches', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const recentSearches = await UserService.getRecentSearches(userId);
    res.json(recentSearches);
  } catch (error) {
    console.error("Error fetching recent searches:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get('/favoriteSearches', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const favoriteSearches = await UserService.getFavoriteSearches(userId);
    res.json(favoriteSearches);
  } catch (error) {
    console.error("Error fetching favorite searches:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post('/recentSearches', authMiddleware, async (req, res) => {
  const { search } = req.body;
  try {
    const userId = req.userId;
    const updatedRecentSearches = await UserService.addRecentSearch(userId, search);
    res.json(updatedRecentSearches);
  } catch (error) {
    console.error("Error adding recent search:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post('/favoriteSearches', authMiddleware, async (req, res) => {
  const { search } = req.body;
  try {
    const userId = req.userId;
    const updatedFavorites = await UserService.toggleFavoriteSearch(userId, search);
    res.json(updatedFavorites);
  } catch (error) {
    console.error("Error toggling favorite search:", error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
