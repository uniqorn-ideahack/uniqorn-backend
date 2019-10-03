const knex = require("knex")(
  require("../../knexfile")[process.env.NODE_ENV || "development"]
);
const ValidationError = require("../errors/validationError");

class User {
  constructor(data) {
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;
    this.password = data.password;
    this.color = data.color;
  }

  async save() {
    if (!this.name || !this.surname) {
      throw new ValidationError("Missing name or surname");
    }
    const res = await knex
      .returning(["name", "surname", "email", "id", "color"])
      .insert({
        name: this.name,
        surname: this.surname,
        email: this.email,
        color: this.color,
        password: this.password
      })
      .into("users");
    return res[0];
  }

  static async getById(id) {
    if (isNaN(id) || id < 0) {
      throw new ValidationError("Invalid user ID");
    }
    const user = await knex("users")
      .select()
      .where("id", id)
      .first();
    return user;
  }

  static async getByEmail(email) {
    const user = await knex("users")
      .select()
      .where("email", email)
      .first();
    return user;
  }

  static async update(id, data) {
    if (isNaN(id) || id < 0) {
      throw new ValidationError("Invalid user ID");
    }
    let update = {
      last_daily: data.last_daily,
      last_login: data.last_login
    };
    const user = await knex("users")
      .where("id", id)
      .update(update, ["id", "last_daily", "created_at", "updated_at"]);
    return user[0];
  }

  static async finishedChallenge(userId, challengeId) {
    if (isNaN(id) || id < 0) {
      throw new ValidationError("Invalid user ID");
    }
    const user = await knex("users")
      .returning(["name", "surname", "points"])
      .where("id", id)
      .increment("points", points);
    console.log("added... ", user);
    return user[0];
  }

  static async getAll() {
    const users = await knex("users")
      .select(["id", "name", "surname", "points"]);
    return users;
  }
}

module.exports = User;
