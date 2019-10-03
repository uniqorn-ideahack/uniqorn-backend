const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const secure = require("../../lib/middleware/secured");
const User = require('../../models/user');

router.get("/users", secure, async (req, res, next) => {
  logger.info("GET /users", null, {
    reqId: httpContext.get("reqId")
  });

  try {
    let users = await User.getAll();
    res.result = users;
  } catch (error) {
    logger.error(error);
    next(error);
  }
  next();
});

module.exports = router;
