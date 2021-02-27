const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const {User} = require("../models");

const doesPasswordMatch = (enteredPassword, originalPassword) => {
  return new Promise(resolve => {
    bcrypt.compare(enteredPassword, originalPassword, (err, res) => {
      resolve(res);
    });
  });
};

const generateToken = (id) => {
  const token = jwt.sign({id: id}, config.secret, {
    expiresIn: config.tokenExpiration, // expires in 5 minutes
  });

  return token;
};

class UserController {

  async signUp(request, result) {
    const body = request.body;

    if (!body) {
      return result.status(400).send("No request body present");
    }

    if (!body.fullName) {
      return result.status(400).send("No request body full name value present");
    }

    if (!body.username) {
      return result.status(400).send("No request body username value present");
    }

    if (!body.email) {
      return result.status(400).send("No request body email value present");
    }

    if (!body.password) {
      return result.status(400).send("No request body password value present");
    }

    const password = bcrypt.hashSync(body.password, 8);
    body.password = password;

    try {
      const newUser = await User.create(body);
      const token = generateToken(newUser.id);

      return result.status(201).json({token: token});
    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }

  async signIn(request, result) {
    const body = request.body;

    if (!body) {
      return result.status(400).send("No request body present");
    }

    if (!body.password) {
      return result.status(400).send("No request body password name value present");
    }

    if (!body.username) {
      return result.status(400).send("No request body username value present");
    }

    try {
      const user = await User.findOne({
        where: {username: body.username},
      });

      if (user) {
        const authenticated = await doesPasswordMatch(body.password, user.password);

        if (!authenticated) return result.status(404).send("User not found");
        const token = generateToken(user.id);

        return result.status(200).send({authorized : true, token: token});

      } else {
        return result.status(404).send("User not found");
      }
    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }

}

module.exports = UserController;
