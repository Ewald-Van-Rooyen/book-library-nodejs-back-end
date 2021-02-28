"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Books", [
      {
        name: "Lord of the rings fellowship of the ring",
        yearPublished: 1954,
        isbnNumber:"978-3-16-148410-0",
        categoryId: 1,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        name: "The Lion, the Witch and the Wardrobe",
        yearPublished: 1950,
        isbnNumber:"978-3-16-148410-1",
        categoryId: 2,
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Horton Hatches the Egg",
        yearPublished: 1940,
        isbnNumber:"978-3-16-148410-2",
        categoryId: 3,
        authorId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Books", null, {});
  },
};
