const knex = require("knex")(
  require("../../knexfile")[process.env.NODE_ENV || "development"]
);
const ValidationError = require("../errors/validationError");

class Challenge {
  constructor(data) {
    this.title = data.title;
    this.points = data.points;
    this.description = data.description;
  }

  async save() {
    if (!this.title || !this.points || !this.description) {
      throw new ValidationError("Missing data");
    }
    const res = await knex
      .returning(["id", "title", "points", "description"])
      .insert({
        title: this.title,
        description: this.description,
        points: this.points
      })
      .into("challenges");
    return res[0];
  }

  static async getById(id) {
    if (isNaN(id) || id < 0) {
      throw new ValidationError("Invalid challenge ID");
    }
    console.log(`getting ${id}`)
    const challenge = await knex("challenges")
      .select()
      .where("id", id)
      .first();
    return challenge;
  }

  static async get(num) {
    const challenges = await knex("challenges")
      .orderByRaw('random()')
      .limit(num);
    return challenges;
  }
}

module.exports = Challenge;
