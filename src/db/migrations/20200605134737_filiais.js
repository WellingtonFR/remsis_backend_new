exports.up = function (knex) {
  knex.schema.hasTable('filiais').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("filiais", function (table) {
        table.increments();
        table.integer("numeroFilial").notNullable();
        table.string("endereco").notNullable();
        table.integer("numeroEndereco").notNullable();
        table.string("complemento");
        table.string("cidade").notNullable();
        table.string("estado").notNullable();
        table.string("nomeFantasia").notNullable();
        table.timestamps(true, true);
      });
    };
  });
}

exports.down = function (knex) {
  return knex.schema.dropTable("filiais");
};
