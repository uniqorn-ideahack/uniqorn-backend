const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY
}