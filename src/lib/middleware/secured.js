const passport = require("../passport");
const TokenError = require("../../errors/tokenError")
const logger = require('../../logger')

module.exports = function(req, res, next) {
  passport.authenticate("jwt", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (info) {
      logger.info(info)
      return next(new TokenError("Invalid Token", info));
    }
    // just to be sure... if authentication fails, info should already be defined => at this point user should be defined
    // See http://www.passportjs.org/docs/authenticate/#custom-callback
    if (!user) {
      return next({
        status: 500,
        message: "Failed to authenticate"
      });
    }
    res.locals.user = { ...user };
    next();
  })(req, res, next);
};
