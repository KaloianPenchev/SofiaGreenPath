const User = require('../models/User');
const bcrypt = require('bcryptjs');

const UserService = {
  createUser: async (email, username, password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email, username, password: hashedPassword });
      return user;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  },

  findUserByUsername: async (username) => {
    return User.findOne({ where: { username } });
  },

  getRecentSearches: async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");
    return user.recentSearches || [];
  },

  getFavoriteSearches: async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");
    return user.favouriteSearches || [];
  },

  addRecentSearch: async (userId, search) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    const recent = user.recentSearches || [];
    const updatedRecent = [search, ...recent.filter(item => item !== search)].slice(0, 10);

    user.recentSearches = updatedRecent;
    if (user.favouriteSearches.includes(search)) {
      user.favouriteSearches = user.favouriteSearches.filter(fav => fav !== search);
    }
    await user.save();
    return user.recentSearches;
  },

  toggleFavoriteSearch: async (userId, search) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    const favorites = user.favouriteSearches || [];
    const recent = user.recentSearches || [];

    if (favorites.includes(search)) {
      user.favouriteSearches = favorites.filter(fav => fav !== search);
      user.recentSearches = [search, ...recent.filter(item => item !== search)].slice(0, 10);
    } else {
      user.favouriteSearches = [...favorites, search];
      user.recentSearches = recent.filter(item => item !== search);
    }

    await user.save();
    return user.favouriteSearches;
  }
};

module.exports = UserService;
