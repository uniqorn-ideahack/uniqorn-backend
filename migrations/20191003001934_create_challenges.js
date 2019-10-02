exports.up = async function(knex) {
  await knex.schema.createTable("challenges", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.integer("points").unsigned();
    t.string("title").notNull();
    t.string("description").notNull();
    t.timestamps(true, true);
  });
  await knex.schema.createTable("daily_challenges", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.integer("user_id")
      .unsigned()
      .index();
    t.integer("challenge_id")
      .unsigned()
      .index();
    t.timestamps(true, true);
    t.foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("cascade");
    t.foreign("challenge_id")
      .references("id")
      .inTable("users")
      .onDelete("cascade");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("challenges");
  await knex.schema.dropTable("daily_challenges");
};
