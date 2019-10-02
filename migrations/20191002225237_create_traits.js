exports.up = async function(knex) {
  await knex.schema.createTable("traits", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.integer("user_id")
      .unsigned()
      .index();
    t.string("text").notNull();
    t.timestamps(true, true);
    t.foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("cascade");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("traits");
};
