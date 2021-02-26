module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert("Authors", [
            {
                firstName: "John Ronald Reuel",
                lastName: "Tolkien",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: "Clive Staples ",
                lastName: "Lewis",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: "Theodor",
                lastName: "Seuss",
                createdAt: new Date(),
                updatedAt: new Date()
            },], {});
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete("Authors", null, {});
    }
};
