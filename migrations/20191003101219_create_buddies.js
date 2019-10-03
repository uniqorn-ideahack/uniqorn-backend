exports.up = async function(knex) {
  await knex.schema.createTable("buddies", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.integer("user_one")
      .unsigned()
      .index();
    t.integer("user_two")
      .unsigned()
      .index();
    t.timestamps(true, true);
    t.foreign("user_one")
      .references("id")
      .inTable("users")
      .onDelete("cascade");
    t.foreign("user_two")
      .references("id")
      .inTable("users")
      .onDelete("cascade");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("buddies");
};
