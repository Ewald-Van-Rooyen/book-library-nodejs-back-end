const app = require("./app");

const PORT = process.env.PORT || 4000;

// Setup of the application to listen on PORT
const server = app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

module.exports = server;


