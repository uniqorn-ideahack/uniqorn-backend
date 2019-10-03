exports.up = async function(knex) {
  await knex.schema.alterTable("users", t => {
    t.integer("last_completed_challenge_id")
      .unsigned()
      .index();
    t.timestamp("last_completed_challenge_time");
    t.foreign("last_completed_challenge_id")
      .references("id")
      .inTable("challenges")
      .onDelete("cascade");
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable("users", t => {
    t.dropColumn('last_completed_challenge_id');
    t.dropColumn('last_completed_challenge_time');
  });
};