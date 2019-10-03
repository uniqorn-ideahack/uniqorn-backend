const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const secure = require("../../lib/middleware/secured");
const DailyChallenge = require("../../models/dailyChallenge");
const Challenge = require("../../models/challenge");
const User = require("../../models/user");

router.post("/dailychallenges/:id", secure, async (req, res, next) => {
  logger.info("POST /dailychallenges/%s", req.params.id, {
    reqId: httpContext.get("reqId")
  });
  try {
    let challengeId = await DailyChallenge.deleteById(req.params.id);
    if (!challengeId[0]) {
      // no daily challenge with this id found
      return next({
        status: 404,
        message: "Daily challenge not found"
      });
    }
    console.log(challengeId);
    let points = await Challenge.getById(challengeId[0]).then(ch => ch.points);
    console.log(`points ${points}`);
    let user = await User.addPoints(res.locals.user.id, points);
    console.log(`user `, user);
    res.result = user;
  } catch (error) {
    logger.error(error);
    next(error);
  }
  next();
});

module.exports = router;
