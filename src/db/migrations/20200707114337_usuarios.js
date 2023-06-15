exports.up = function (knex) {
  knex.schema.hasTable('usuarios').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("usuarios", function (table) {
        table.increments();
        table.string("nomeUsuario").notNullable();
        table.string("idUsuario").notNullable();
        table.string("hashedPassword").notNullable();
        table.string("created_at");
        table.string("updated_at");
      });
    };
  })
}
exports.down = function (knex) {
  return knex.schema.dropTable("usuarios");
};
