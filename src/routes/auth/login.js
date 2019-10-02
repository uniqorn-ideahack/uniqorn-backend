const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const jwt = require("jsonwebtoken");
const jwtOptions = require("../../lib/jwtOptions");
const User = require("../../models/user");
const bCrypt = require("bcryptjs");

const isValidPassword = function(user, password) {
  return bCrypt.compareSync(password, user.password);
};

// ensure that in production the answer for wrong username and password is the same
const authFail = function(cause) {
  return {
    status: 401,
    message: "Unkown username or wrong password",
    cause: cause
  };
};

router.post("/auth/login", async (req, res, next) => {
  logger.info("POST /auth/login", null, {
    reqId: httpContext.get("reqId")
  });
  if (!req.body.email || !req.body.password) {
    next({
      status: 401,
      message: "Missing login data"
    });
    return;
  }
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.getByEmail(email);
    if (!user) {
      next(authFail("User Not Found"));
      return;
    }
    if (!isValidPassword(user, password)) {
      next(authFail("Invalid password"));
      return;
    }
    const options = {
      expiresIn: "1h"
    };
    const payload = {
      sub: user.id,
      iat: Math.floor(Date.now() / 1000) - 30
    };
    const token = jwt.sign(payload, jwtOptions.secretOrKey, options);
    delete user.password;
    res.result = { token: token, user: user };
    next();
  } catch (error) {
    logger.error(error, { reqId: httpContext.get("reqId") });
    next(error);
  }
});

module.exports = router;
