const jwt = require("jsonwebtoken");
const config = require("../config.js");

const verifyToken = (request, result, next)=> {

  // check header or url parameters or post parameters for token
  const token = request.headers["x-access-token"];

  if (!token)
    return result.status(403).send({ authorization: false, message: "No token provided." });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, (error, decoded)=> {
    if (error)
      return result.status(500).send({ authorization: false, message: "Failed to authenticate token." });

    // if everything is good, save to request for use in other routes
    result = decoded;
    next();
  });

};

module.exports = verifyToken;
