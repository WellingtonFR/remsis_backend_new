exports.up = function (knex) {
  knex.schema.hasTable("transportadores").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("transportadores", function (table) {
        table.increments();
        table.string("nomeTransportador").notNullable();
        table.string("placaVeiculo").notNullable();
        table.integer("filialAtendida");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("transportadores");
};
