require("dotenv").config();
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: "./bin/seeds"
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: "./bin/seeds"
    }
  }
};
