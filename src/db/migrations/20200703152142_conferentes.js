exports.up = function (knex) {
  knex.schema.hasTable("conferentes").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("conferentes", function (table) {
        table.increments();
        table.string("idConferente").notNullable();
        table.string("nomeConferente").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    }
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("conferentes");
};
