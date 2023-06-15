//const moment = require("moment");
const connection = require("../db/connection");
const validation = require("../validations/filiaisValidation");

module.exports = {
  async index(req, res) {
    try {
      const data = await connection("filiais")
        .select("*")
        .orderBy("numeroFilial");
      return res.json(data);
    } catch (err) {
      return res.status(400).send("Não foi encontrada nenhuma filial");
    }
  },
  async create(req, res) {
    const {
      numeroFilial,
      cidade,
      estado,
      endereco,
      numeroEndereco,
      complemento,
      nomeFantasia,
    } = req.body;
    //const created_at = moment().format("MM DD YYYY, h:mm:ss a");

    await validation.filiaisSchema
      .validateAsync({
        numeroFilial: numeroFilial,
        cidade: cidade,
        estado: estado,
        endereco: endereco,
        numeroEndereco: numeroEndereco,
        complemento: complemento,
        nomeFantasia: nomeFantasia,
      })
      .catch((err) => {
        return res.status(400).send({ message: err.details[0].message });
      });

    try {
      const verificarFilial = await connection("filiais")
        .select("numeroFilial")
        .where({ numeroFilial: numeroFilial });

      if (verificarFilial.length !== 0) {
        return res.status(400).send({ message: "Filial já está cadastrada" });
      }

      await connection("filiais").insert({
        numeroFilial,
        cidade,
        estado,
        endereco,
        numeroEndereco,
        complemento,
        nomeFantasia,
      });
      return res.status(200).send("Criado com sucesso");
    } catch (err) {
      return res.status(400).send("Contate o administrador");
    }
  },
  async update(req, res) {
    const {
      numeroFilial,
      cidade,
      estado,
      endereco,
      numeroEndereco,
      complemento,
      nomeFantasia,
    } = req.body;
    //const updated_at = moment().format("MM DD YYYY, h:mm:ss a");

    await validation.filiaisSchema
      .validateAsync({
        numeroFilial: numeroFilial,
        cidade: cidade,
        estado: estado,
        endereco: endereco,
        numeroEndereco: numeroEndereco,
        complemento: complemento,
        nomeFantasia: nomeFantasia,
      })
      .catch((err) => {
        return res.status(400).send({ message: err.details[0].message });
      });

    try {
      const { id } = req.params;
      await connection("filiais").where({ id: id }).update({
        numeroFilial,
        cidade,
        estado,
        endereco,
        numeroEndereco,
        complemento,
        nomeFantasia,
      });
      return res.status(200).send("Atualizado com sucesso");
    } catch (err) {
      return res.status(400).send("Erro ao atualizar os dados");
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    await validation.id
      .validateAsync({
        id: id,
      })
      .catch((err) => {
        return res.status(400).send({ message: err.details[0].message });
      });

    const verificarFilial = await connection("filiais")
      .select("numeroFilial")
      .where({ id: id });

    if (verificarFilial.length === 0) {
      return res.status(400).send({ message: "Filial não encontrada" });
    }

    await connection("filiais")
      .where({ id: id })
      .delete()
      .then(() => {
        return res.status(204).send("Excluído com sucesso");
      })
      .catch((err) => {
        return res.status(400).send({ message: "Erro ao excluir filial" });
      });
  },
  async findById(req, res) {
    const { id } = req.params;

    await validation.id
      .validateAsync({
        id: id,
      })
      .catch((err) => {
        return res.status(400).send({ message: err.details[0].message });
      });

    await connection("filiais")
      .select("*")
      .where({ id: id })
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        return res.status(400).send("Filial não encontrada");
      });
  },
  async findByNumeroFilial(req, res) {
    const { numeroFilial } = req.params;

    await validation.numeroFilialSchema
      .validateAsync({
        numeroFilial: numeroFilial,
      })
      .catch((err) => {
        return res.status(400).send({ message: err.details[0].message });
      });

    await connection("filiais")
      .select(
        "numeroFilial",
        "endereco",
        "numeroEndereco",
        "complemento",
        "nomeFantasia"
      )
      .where({ numeroFilial: numeroFilial })
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        return res.status(400).send("Filial não encontrada");
      });
  },
};
