const express = require("express");
const router = express.Router();
const logger = require("../../logger");
const httpContext = require("express-http-context");
const secure = require("../../lib/middleware/secured");
const Boddy = require("../../models/buddy");

router.get("/buddies", secure, async (req, res, next) => {
  logger.info("GET /buddies", null, {
    reqId: httpContext.get("reqId")
  });

  try {
    console.log(`getting for user ${res.locals.user.id}`)
    let buddies = await Boddy.getByUser(res.locals.user.id);
    console.log(`found `, buddies)
    res.result = buddies;
    next();
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

module.exports = router;
