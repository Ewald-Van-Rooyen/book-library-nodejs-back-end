const express = require("express");

const jwt = require("jsonwebtoken");
const config = require("../config");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const userController = new UserController();

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);

router.get("/me", (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({
      auth: false,
      message: "No token provided.",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Failed to authenticate token.",
      });
    }

    res.status(200).send(decoded);
  });
});

module.exports = router;
