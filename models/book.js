"use strict";
const {
  Model,
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsTo(models.Author, {
        foreignKey: "authorId",
        targetKey: "id",
        as: "author",
      });

      Book.belongsTo(models.Category, {
        foreignKey: "categoryId",
        targetKey: "id",
        as: "category",
      });
    }
  }

  Book.init({
    name: DataTypes.STRING,
    isbnNumber: DataTypes.STRING,
    yearPublished: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: "Book",
  });
  return Book;
};
