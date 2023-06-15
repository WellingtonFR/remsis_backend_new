exports.up = function (knex) {
  knex.schema.hasTable('transportadores').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("transportadores", function (table) {
        table.increments();
        table.string("nomeTransportador").notNullable();
        table.string("placaVeiculo").notNullable();
        table.integer("filialAtendida");
        table.timestamps(false, true);
      });
    };
  })
}


exports.down = function (knex) {
  return knex.schema.dropTable("transportadores");
};
