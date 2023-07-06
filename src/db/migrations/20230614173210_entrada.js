exports.up = function (knex) {
  knex.schema.hasTable("entrada").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("entrada", function (table) {
        table.increments();
        table.text("filialOrigem").notNullable();
        table.text("conferente").notNullable();
        table.text("doca").notNullable();
        table.text("notaFiscal").notNullable();
        table.text("codigo").notNullable();
        table.text("descricaoProduto").notNullable();
        table.text("quantidadeProduto").notNullable();
        table.text("filialDestino").notNullable();
        table.text("observacao");
        table.boolean("enviado").defaultTo(false);

        table.string("created_at").defaultTo(knex.fn.now());
        table.string("updated_at").defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("transferencias");
};
