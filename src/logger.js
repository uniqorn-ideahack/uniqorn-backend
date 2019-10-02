const { createLogger, format, transports } = require("winston");

const loggerConfig = {
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
    new transports.Console({ format: format.simple(), level: "debug" })
  ],
  exceptionHandlers: [
    new transports.File({ filename: "logs/error.log" }),
    new transports.Console({ format: format.simple(), level: "debug" })
  ]
};

module.exports = createLogger(loggerConfig);