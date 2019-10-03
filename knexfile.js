require("dotenv").config();
module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: "./bin/seeds"
    },
    pool: {
      min: 0,
      max: 4
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: "./bin/seeds"
    }
  }
};
