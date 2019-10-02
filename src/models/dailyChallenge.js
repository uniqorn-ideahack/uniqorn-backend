const knex = require("knex")(
  require("../../knexfile")[process.env.NODE_ENV || "development"]
);
const ValidationError = require("../errors/validationError");

class DailyChallenge {
  constructor(data) {
    this.user_id = data.user_id;
    this.challenge_id = data.challenge_id;
  }

  async save() {
    if (!this.user_id || !this.challenge_id ) {
      throw new ValidationError("Missing data");
    }
    const res = await knex
      .returning(["id"])
      .insert({
        user_id: this.user_id,
        challenge_id: this.challenge_id
      })
      .into("daily_challenges");
    return res[0];
  }

  static async getById(id) {
    if (isNaN(id) || id < 0) {
      throw new ValidationError("Invalid challenge ID");
    }
    const challenge = await knex("daily_challenges")
      .select()
      .where("id", id)
      .first();
    return challenge;
  }

  static async deleteById(id) {
    if (isNaN(id) || id < 0) {
      throw new ValidationError("Invalid challenge ID");
    }
    const num_del = await knex("daily_challenges")
      .where("id", id)
      .del();
    return num_del;
  }

  static async getByUserId(user_id) {
    const dailyChallenges = await knex("daily_challenges")
      .select()
      .where("user_id", user_id);
    return dailyChallenges;
  }
}

module.exports = DailyChallenge;
