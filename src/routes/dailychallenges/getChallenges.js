const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const secure = require("../../lib/middleware/secured");
const DailyChallenge = require("../../models/dailyChallenge");
const Challenge = require("../../models/challenge");
const User = require("../../models/user");

router.get("/dailyChallenges", secure, async (req, res, next) => {
  logger.info("GET /dailyChallenges", null, {
    reqId: httpContext.get("reqId")
  });

  try {
    let dailyChallenges = await DailyChallenge.getByUserId(res.locals.user.id);
    if (dailyChallenges && dailyChallenges.length > 0) {
      res.result = await Promise.all(
        dailyChallenges.map(ch => {
          return Challenge.getById(ch.challenge_id);
        })
      );
      return next();
    }
    let user = await User.getById(res.locals.user.id);
    let date = new Date(user.last_daily);
    let now = new Date();
    if (
      date.getDate() === now.getDate() ||
      date.getMonth() === now.getMonth() ||
      date.getFullYear() === now.getFullYear()
    ) {
      res.result = [];
      return next();
    }
    // load new ones
    let newChalleges = await Challenge.get(3);
    let toDo = [];
    for (let challenge of newChalleges) {
      toDo.push(
        new DailyChallenge({
          user_id: res.locals.user.id,
          challenge_id: challenge.id
        }).save()
      );
    }
    toDo.push(User.update(res.locals.user.id, { last_daily: now }));
    await Promise.all(toDo);
    res.result = newChalleges;
    next();
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

module.exports = router;