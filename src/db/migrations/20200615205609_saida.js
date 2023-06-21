exports.up = function (knex) {
  knex.schema.hasTable("saida").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("saida", function (table) {
        table.increments();
        table.text("data").notNullable();
        table.text("numeroControle").notNullable();
        table.text("filialDestino").notNullable();
        table.text("nomeFilialDestino").notNullable();
        table.text("enderecoFilialDestino").notNullable();
        table.text("transportador").notNullable();
        table.text("conferente").notNullable();
        table.text("placaVeiculo").notNullable();
        table.text("doca").notNullable();

        table.text("filialOrigem_1").notNullable();
        table.text("notaFiscal_1").notNullable();
        table.text("tipoOperacao_1").notNullable();
        table.text("codigo_1").notNullable();
        table.text("descricaoProduto_1").notNullable();
        table.text("quantidadeProduto_1").notNullable();
        table.text("observacao_1");

        table.text("filialOrigem_2");
        table.text("notaFiscal_2");
        table.text("tipoOperacao_2");
        table.text("codigo_2");
        table.text("descricaoProduto_2");
        table.text("quantidadeProduto_2");
        table.text("observacao_2");

        table.text("filialOrigem_3");
        table.text("notaFiscal_3");
        table.text("tipoOperacao_3");
        table.text("codigo_3");
        table.text("descricaoProduto_3");
        table.text("quantidadeProduto_3");
        table.text("observacao_3");

        table.text("filialOrigem_4");
        table.text("notaFiscal_4");
        table.text("tipoOperacao_4");
        table.text("codigo_4");
        table.text("descricaoProduto_4");
        table.text("quantidadeProduto_4");
        table.text("observacao_4");

        table.text("filialOrigem_5");
        table.text("notaFiscal_5");
        table.text("tipoOperacao_5");
        table.text("codigo_5");
        table.text("descricaoProduto_5");
        table.text("quantidadeProduto_5");
        table.text("observacao_5");

        table.text("filialOrigem_6");
        table.text("notaFiscal_6");
        table.text("tipoOperacao_6");
        table.text("codigo_6");
        table.text("descricaoProduto_6");
        table.text("quantidadeProduto_6");
        table.text("observacao_6");

        table.text("filialOrigem_7");
        table.text("notaFiscal_7");
        table.text("tipoOperacao_7");
        table.text("codigo_7");
        table.text("descricaoProduto_7");
        table.text("quantidadeProduto_7");
        table.text("observacao_7");

        table.text("filialOrigem_8");
        table.text("notaFiscal_8");
        table.text("tipoOperacao_8");
        table.text("codigo_8");
        table.text("descricaoProduto_8");
        table.text("quantidadeProduto_8");
        table.text("observacao_8");

        table.text("filialOrigem_9");
        table.text("notaFiscal_9");
        table.text("tipoOperacao_9");
        table.text("codigo_9");
        table.text("descricaoProduto_9");
        table.text("quantidadeProduto_9");
        table.text("observacao_9");

        table.text("filialOrigem_10");
        table.text("notaFiscal_10");
        table.text("tipoOperacao_10");
        table.text("codigo_10");
        table.text("descricaoProduto_10");
        table.text("quantidadeProduto_10");
        table.text("observacao_10");

        table.text("filialOrigem_11");
        table.text("notaFiscal_11");
        table.text("tipoOperacao_11");
        table.text("codigo_11");
        table.text("descricaoProduto_11");
        table.text("quantidadeProduto_11");
        table.text("observacao_11");

        table.text("filialOrigem_12");
        table.text("notaFiscal_12");
        table.text("tipoOperacao_12");
        table.text("codigo_12");
        table.text("descricaoProduto_12");
        table.text("quantidadeProduto_12");
        table.text("observacao_12");

        table.text("filialOrigem_13");
        table.text("notaFiscal_13");
        table.text("tipoOperacao_13");
        table.text("codigo_13");
        table.text("descricaoProduto_13");
        table.text("quantidadeProduto_13");
        table.text("observacao_13");

        table.text("filialOrigem_14");
        table.text("notaFiscal_14");
        table.text("tipoOperacao_14");
        table.text("codigo_14");
        table.text("descricaoProduto_14");
        table.text("quantidadeProduto_14");
        table.text("observacao_14");

        table.text("filialOrigem_15");
        table.text("notaFiscal_15");
        table.text("tipoOperacao_15");
        table.text("codigo_15");
        table.text("descricaoProduto_15");
        table.text("quantidadeProduto_15");
        table.text("observacao_15");

        table.text("filialOrigem_16");
        table.text("notaFiscal_16");
        table.text("tipoOperacao_16");
        table.text("codigo_16");
        table.text("descricaoProduto_16");
        table.text("quantidadeProduto_16");
        table.text("observacao_16");

        table.text("filialOrigem_17");
        table.text("notaFiscal_17");
        table.text("tipoOperacao_17");
        table.text("codigo_17");
        table.text("descricaoProduto_17");
        table.text("quantidadeProduto_17");
        table.text("observacao_17");

        table.text("filialOrigem_18");
        table.text("notaFiscal_18");
        table.text("tipoOperacao_18");
        table.text("codigo_18");
        table.text("descricaoProduto_18");
        table.text("quantidadeProduto_18");
        table.text("observacao_18");

        table.text("filialOrigem_19");
        table.text("notaFiscal_19");
        table.text("tipoOperacao_19");
        table.text("codigo_19");
        table.text("descricaoProduto_19");
        table.text("quantidadeProduto_19");
        table.text("observacao_19");

        table.text("filialOrigem_20");
        table.text("notaFiscal_20");
        table.text("tipoOperacao_20");
        table.text("codigo_20");
        table.text("descricaoProduto_20");
        table.text("quantidadeProduto_20");
        table.text("observacao_20");

        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("saida");
};
