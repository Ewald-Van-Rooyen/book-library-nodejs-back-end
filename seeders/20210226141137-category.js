module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Categories", [
      {
        name: "Fantasy",
        description: "Fantasy description stuff here",
        createdBy: "admin",
        updatedBy: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Children",
        createdBy: "root",
        updatedBy: "admin",
        description: "Children description stuff here",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dark Fantasy",
        description: "Old Fantasy description stuff here",
        createdBy: "root",
        updatedBy: "root",
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
