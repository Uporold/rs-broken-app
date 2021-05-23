import DataTypes from 'sequelize';
import { sequelize } from '../../../db.js';

export const UserModel = sequelize.define('user', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});
