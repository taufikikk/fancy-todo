'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: "Title is required"
        },
        notNull: {
          msg: "Title is required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: "Description is required"
        },
        notNull: {
          msg: "Description is required"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: "Status is required"
        },
        notNull: {
          msg: "Status is required"
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: {
          args: new Date().toISOString().substring(0,10),
          msg: "The date must be after date"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};