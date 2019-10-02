const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const secure = require("../../lib/middleware/secured");
const DailyChallenge = require("../../models/dailyChallenge");
const Challenge = require("../../models/challenge");

router.get("/dailyChallenges", secure, async (req, res, next) => {
  logger.info("GET /dailyChallenges", null, {
    reqId: httpContext.get("reqId")
  });

  try {
    let dailyChallenges = await DailyChallenge.getByUserId(res.locals.user.id);
    if (dailyChallenges && dailyChallenges.length > 0) {
      res.result = await Promise.all(dailyChallenges.map(ch => {
        Challenge.getById(ch.challenge_id)
      }))
      next();
    }
    // load new ones
    let newChalleges = await Challenge.get(3);
    let toDo = [];
    for (let challenge of newChalleges) {
      toDo.push(
        new DailyChallenge({
          user_id: res.locals.user.id,
          challenge_id: challenge.id
        })
      );
    }
    await Promise.all(toDo);
  } catch (error) {
    logger.error(error);
    next(error);
  }
  next();
});

module.exports = router;
