module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Authors", [
      {
        firstName: "John Ronald Reuel",
        lastName: "Tolkien",
        createdBy: "admin",
        updatedBy: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Clive Staples ",
        lastName: "Lewis",
        createdBy: "root",
        updatedBy: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Theodor",
        lastName: "Seuss",
        createdBy: "admin",
        updatedBy: "root",
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Authors", null, {});
  },
};
