exports.up = function (knex) {
  knex.schema.hasTable("usuarios").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("usuarios", function (table) {
        table.increments();
        table.string("nomeUsuario").notNullable();
        table.string("idUsuario").notNullable();
        table.string("hashedPassword").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    }
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("usuarios");
};
