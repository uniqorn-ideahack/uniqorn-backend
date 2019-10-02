const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = require("./jwtOptions");
const User = require("../models/user");

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User.getById(jwt_payload.sub)
    .then(user => {
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    })
    .catch(error => {
      next(err, false);
    });
});

passport.use(strategy);

module.exports = passport;
