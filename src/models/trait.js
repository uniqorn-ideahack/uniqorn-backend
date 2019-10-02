const knex = require("knex")(
  require("../../knexfile")[process.env.NODE_ENV || "development"]
);
const ValidationError = require("../errors/validationError");

class Trait {
  constructor(data) {
    this.user_id = data.user_id;
    this.text = data.text;
  }

  async save() {
    if (!this.user_id || !this.text) {
      throw new ValidationError("Missing user_id or text");
    }
    const res = await knex
      .returning(["id", "user_id", "text"])
      .insert({
        user_id: this.user_id,
        text: this.text
      })
      .into("traits");
    return res[0];
  }

  static async getById(id) {
    if (isNaN(id) || id < 0) {
      throw new ValidationError("Invalid trait ID");
    }
    const trait = await knex("traits")
      .select()
      .where("id", id)
      .first();
    return trait;
  }

  static async getByUserId(user_id) {
    const traits = await knex("traits")
      .select()
      .where("user_id", user_id);
    return traits;
  }
}

module.exports = Trait;
