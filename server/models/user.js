'use strict';
let bcrypt = require('bcryptjs')
const {hashPassword} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: "Email is required"
        },
        notNull: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Email format is invalid"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: "Password is required"
        },
        notNull: {
          msg: "Password is required"
        },
        len: {
          args: [6, 32],
          msg: "Password min 6 characters"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (userData, opt) => {
        userData.password = hashPassword(userData.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};