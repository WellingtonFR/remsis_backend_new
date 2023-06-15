exports.up = function (knex) {
  knex.schema.hasTable('conferentes').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("conferentes", function (table) {
        table.increments();
        table.string("idConferente").notNullable();
        table.string("nomeConferente").notNullable();
        table.timestamps(false, true);
      });
    };
  })
}
exports.down = function (knex) {
  return knex.schema.dropTable("conferentes");
};
