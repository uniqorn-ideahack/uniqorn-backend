const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const secure = require("../../lib/middleware/secured");
const Trait = require('../../models/trait');

router.post("/traits", secure, async (req, res, next) => {
  logger.info("POST /traits", null, {
    reqId: httpContext.get("reqId")
  });
  if (!req.body.traits) {
    next({
      status: 401,
      message: "Missing trait data"
    });
    return;
  }
  const traits = req.body.traits;
  try {
    await Promise.all(
      traits.map(trait =>
        new Trait({ user_id: res.locals.user.id, text: trait }).save()
      )
    );
    res.result = {message: "OK"}
  } catch (error) {
    logger.error(error);
    next(error);
  }
  next();
});

module.exports = router;
