const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const secure = require("../../lib/middleware/secured");
const Buddy = require('../../models/buddy');
const User = require('../../models/user');

router.post("/buddy", secure, async (req, res, next) => {
  logger.info("POST /buddy", null, {
    reqId: httpContext.get("reqId")
  });
  if (!req.body.id) {
    next({
      status: 401,
      message: "Missing id"
    });
    return;
  }
  try {
    await User.getById(req.body.id)
    res.result = await new Buddy({user_one: req.body.id, user_two: res.locals.user.id})
    next()
  } catch (error) {
    logger.error(error);
    next(error);
  }
  next();
});

module.exports = router;
