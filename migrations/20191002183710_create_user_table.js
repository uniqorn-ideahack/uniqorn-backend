exports.up = async knex => {
  await knex.schema.createTable("users", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("name").notNull();
    t.string("surname").notNull();
    t.string("email")
      .notNull()
      .unique()
      .index();
    t.enu("color", ["blue", "red", "yellow", "green"]);
    t.integer("points")
      .unsigned()
      .notNull()
      .defaultTo(0);
    t.timestamp("last_daily");
    t.timestamp("last_login");
    t.string("password").notNull();
    t.boolean("verified")
      .notNull()
      .defaultTo(false);
    t.timestamps(true, true);
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("users");
};
