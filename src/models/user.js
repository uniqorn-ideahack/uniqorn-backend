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
  }

  async save() {
    if (!this.name || !this.surname) {
      throw new ValidationError("Missing name or surname");
    }
    const res = await knex
      .returning(["name", "surname", "email", "id"])
      .insert({
        name: this.name,
        surname: this.surname,
        email: this.email,
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

  static async getTeamsById(id) {
    if (isNaN(id) || id < 0) {
      throw new ValidationError("Invalid user ID");
    }
    const teams = await knex("teams")
      .select()
      .where("user_id", id);
    return teams;
  }

  static async getGardensById(id) {
    if (isNaN(id) || id < 0) {
      throw new ValidationError("Invalid user ID");
    }
    let team_ids = await knex("teammates")
      .select("team_id")
      .where("user_id", id);
    team_ids = team_ids.map(team => team.team_id);
    let [gardens, teams] = await Promise.all([
      knex("gardens")
        .select()
        .whereIn("team_id", team_ids),
      knex("teams")
        .select()
        .whereIn("id", team_ids)
    ]);
    gardens = gardens.map(garden => {
      garden.team = teams.find(team => team.id === garden.team_id);
      delete garden.team_id;
      return garden;
    });
    return gardens;
  }

  static async getByEmail(email) {
    const user = await knex("users")
      .select()
      .where("email", email)
      .first();
    return user;
  }
}

module.exports = User;
