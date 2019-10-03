const knex = require("knex")(
  require("../../knexfile")[process.env.NODE_ENV || "development"]
);
const ValidationError = require("../errors/validationError");

class Buddy {
  constructor(data) {
    this.user_one = data.user_one;
    this.user_two = data.user_two;
  }

  async save() {
    if (!this.user_one || !this.user_two) {
      throw new ValidationError("Missing id");
    }
    const res = await knex
      .returning(["id", "user_one", "user_two"])
      .insert({
        user_one: this.user_one,
        user_two: this.user_two
      })
      .into("buddies");
    return res[0];
  }

  static async getById(id) {
    if (isNaN(id) || id < 0) {
      throw new ValidationError("Invalid user ID");
    }
    const buddy = await knex("buddies")
      .select()
      .where("id", id)
      .first();
    return buddy;
  }

  static async getByUser(id) {
    const buddies = await knex("buddies")
      .select()
      .where("user_one", id)
      .orWhere("user_two", id);
    return buddies;
  }
}

module.exports = Buddy;
