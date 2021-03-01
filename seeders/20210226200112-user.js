"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        fullName: "Admin de admin",
        email: "admin@admin.com",
        username: "admin",
        password: bcrypt.hashSync("12345678", 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "Root de root",
        email: "root@root.com",
        username: "root",
        password: bcrypt.hashSync("12345678", 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
