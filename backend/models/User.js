const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

class User extends Model {}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recentSearches: {
    type: DataTypes.JSON, 
    allowNull: true,
    defaultValue: []
  },
  favouriteSearches: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User;
