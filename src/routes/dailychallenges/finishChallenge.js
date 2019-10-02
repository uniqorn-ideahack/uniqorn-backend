const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const secure = require("../../lib/middleware/secured");
const DailyChallenge = require('../../models/dailyChallenge');

router.post("/dailychallenges/:id", secure, async (req, res, next) => {
  logger.info("POST /dailychallenges", null, {
    reqId: httpContext.get("reqId")
  });
  try {
    await DailyChallenge.deleteById(req.params.id)
  } catch (error) {
    logger.error(error);
    next(error);
  }
  next();
});

module.exports = router;
