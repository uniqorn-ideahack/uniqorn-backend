const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require('express-http-context');
const jwt = require("jsonwebtoken");
const jwtOptions = require("../../lib/jwtOptions");
const User = require('../../models/user')
const bCrypt = require('bcryptjs');

const createHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(11), null);
}

router.post("/auth/register", async (req, res, next) => {
  logger.info("POST /auth/register", { reqId: httpContext.get("reqId") });
  data = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: createHash(req.body.password)
  };
  try {
    const user = await new User(data).save();
    delete user.password;
    const options = {
      expiresIn: "1h"
    };
    const payload = {
      sub: user.id,
      iat: Math.floor(Date.now() / 1000) - 30
    };
    const token = jwt.sign(payload, jwtOptions.secretOrKey, options);
    res.result = {token, user};
    next();
  } catch (error) {
    logger.error(error, { reqId: httpContext.get("reqId") });
    next(error);
  }
})

module.exports = router;