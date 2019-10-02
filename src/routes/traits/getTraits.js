const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const secure = require("../../lib/middleware/secured");
const Trait = require('../../models/trait');

router.get("/traits", secure, async (req, res, next) => {
  logger.info("GET /traits", null, {
    reqId: httpContext.get("reqId")
  });

  try {
    let traits = await Trait.getByUserId(res.locals.user.id);
    res.result = traits;
  } catch (error) {
    logger.error(error);
    next(error);
  }
  next();
});

module.exports = router;
