const express = require("express");
const router = express.Router();
const logger = require("../logger");
const httpCotext = require("express-http-context");

router.use(function(req, res, next) {
  logger.info("Receiving request", null, {
    reqId: httpCotext.get("reqId"),
    url: req.url
  });
  next();
});

router.use(require("./auth"));
router.use(require("./traits"));
router.use(require("./dailychallenges"));
router.use(require("./buddy"));
router.use(require("./user"));

if (process.env.NODE_ENV !== "production") {
  router.use(function(req, res, next) {
    if (res.result) {
      logger.info("Aswering request", null, {
        result: res.result,
        reqId: httpCotext.get("reqId")
      });
      res.status(200).json(res.result);
    }
    next()
  });
  // Development error handler will pass stacktrace
  router.use(function(err, req, res, next) {
    logger.info("Failed request", null, {
      result: err,
      reqId: httpCotext.get("reqId")
    });
    res.status(err.httpCode || 500);
    res.json({ error: { ...err, message: err.message, stack: err.stack } });
  });
} else {
  // don't log the response in production
  router.use(function(req, res, next) {
    if (res.result) {
      logger.info("Aswering request", null, { reqId: httpCotext.get("reqId") });
      res.status(200).json(res.result);
    }
    next()
  });
  router.use(function(err, req, res, next) {
    logger.info("Failed request", null, {
      result: err,
      reqId: httpCotext.get("reqId")
    });
    res.status(err.httpCode || 500);
    res.json({
      error: err.message
    });
  });
}

module.exports = router;
