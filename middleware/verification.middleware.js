const jwt = require("jsonwebtoken");
const config = require("../config.js");

// Token verification middleware
const verifyToken = (request, result, next) => {

  // Check the headers token
  const token = request.headers["x-access-token"];

  if (!token) {
    return result.status(403).send({
      authorization: false,
      message: "No token provided.",
    });
  }

  // Verifies the secret
  jwt.verify(token, config.secret, (error, decoded) => {
    if (error) {
      return result.status(500).send({
        authorization: false,
        message: "Failed to authenticate token.",
      });
    }

    result = decoded;
    next();
  });

};

module.exports = verifyToken;
