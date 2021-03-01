"use strict";
const {
  Model,
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    fullName: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: "Username must be unique",
      },
    },
    email:
      {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: "User",
  });
  return User;
};
