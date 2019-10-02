require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const passport = require("./lib/passport");
const uuid = require("uuid");
const httpContext = require("express-http-context");

// CORS - allow origin from env file
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// assign a unique identifier to each request to be able to identify requests in the logs
app.use(httpContext.middleware);
app.use(function(req, res, next) {
  httpContext.set("reqId", uuid.v1());
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());

app.use(routes);

app.listen(process.env.PORT || 3000, "0.0.0.0", function() {
  console.log(`Aja API running on port ${process.env.PORT || 3000}`);
});
