const {
  Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Author.hasMany(models.Book, {foreignKey: "authorId", sourceKey: "id"});
    }
  }

  Author.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "Author",
  });
  return Author;
};
