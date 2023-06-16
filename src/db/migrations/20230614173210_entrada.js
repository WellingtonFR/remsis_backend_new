exports.up = function (knex) {
  knex.schema.hasTable("entrada").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("entrada", function (table) {
        table.increments();
        table.text("dataAtual").notNullable();
        table.text("filialOrigem").notNullable();
        table.text("conferente").notNullable();
        table.text("notaFiscal").notNullable();
        table.text("codigo").notNullable();
        table.text("descricaoProduto").notNullable();
        table.text("quantidadeProduto").notNullable();
        table.text("filialDestino").notNullable();
        table.text("observacao");

        table.string("created_at");
        table.string("updated_at");
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("transferencias");
};
