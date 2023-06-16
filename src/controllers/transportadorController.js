//const moment = require("moment");
const connection = require("../db/connection");
const validation = require("../validations/transportadorValidation");

module.exports = {
  async index(req, res) {
    try {
      const data = await connection("transportadores").select("*").orderBy("filialAtendida", "desc");
      return res.json(data);
    } catch (err) {
      res.status(400).send("Erro ao localizar os transportadores");
    }
  },
  async create(req, res) {
    const { nomeTransportador, placaVeiculo, filialAtendida } = req.body;
    const _placaVeiculo = placaVeiculo.toUpperCase().trim();

    await validation.transportadorSchema.validateAsync({
      nomeTransportador: nomeTransportador,
      placaVeiculo: _placaVeiculo,
      filialAtendida: filialAtendida,
    });

    try {
      const transferenciaId = await connection("transportadores").insert({
        nomeTransportador,
        placaVeiculo: _placaVeiculo,
        filialAtendida,
      });
      return res.status(200).send({ message: "Inserido com sucesso" });
    } catch (err) {
      return res.status(400).send({ message: "Contate o administrador" });
    }
  },
  async update(req, res) {
    const { nomeTransportador, placaVeiculo, filialAtendida } = req.body;
    // const updated_at = moment().format();
    const _placaVeiculo = placaVeiculo.toUpperCase().trim();

    await validation.transportadorSchema.validateAsync({
      nomeTransportador,
      placaVeiculo: _placaVeiculo,
      filialAtendida,
    });

    try {
      const { id } = req.params;
      await connection("transportadores").where({ id: id }).update({
        nomeTransportador,
        placaVeiculo: _placaVeiculo,
        filialAtendida,
      });
      return res.status(200).send({ message: "Alterado com sucesso" });
    } catch (err) {
      return res.status(400).send({ message: "Contate o administrador" });
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    await validation.id.validateAsync({
      id: id,
    });

    const verificarTransportador = await connection("transportadores").select("nomeTransportador").where({ id: id });

    if (verificarTransportador.length === 0) {
      return res.status(400).send({ message: "Tranportador não encontrado" });
    }

    await connection("transportadores")
      .where("id", id)
      .delete()
      .then(() => {
        return res.status(204).send("Excluído com sucesso");
      })
      .catch((err) => {
        return res.status(400).send({ message: "Contate o administrador" });
      });
  },
  async findById(req, res) {
    const { id } = req.params;
    await connection("transportadores")
      .select("*")
      .where("id", id)
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        return res.status(400).send({ message: "Erro ao localizar o transportador" });
      });
  },
  async findByName(req, res) {
    const { nomeTransportador } = req.params;
    await connection("transportadores")
      .select("*")
      .where("nomeTransportador", nomeTransportador)
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        return res.status(400).send({ message: "Erro ao localizar o transportador" });
      });
  },
  async findByFilialAtendida(req, res) {
    const { filialAtendida } = req.params;
    await connection("transportadores")
      .select("*")
      .orderByRaw(`filialAtendida = ${filialAtendida} desc`)
      .orderBy("filialAtendida")
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        return res.status(400).send({ message: "Erro ao localizar o transportador" });
      });
  },
  async find(req, res) {
    const { nomeTransportador } = req.body;

    await connection("transportadores")
      .select("*")
      .where("nomeTransportador", nomeTransportador)
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        return res.status(400).send({ message: "Erro ao localizar o transportador" });
      });
  },
};
