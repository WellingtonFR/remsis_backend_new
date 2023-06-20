const connection = require("../db/connection");
const validation = require("../validations/saidaValidation");

module.exports = {
  async index(req, res) {
    try {
      const data = await connection("transferencias").orderBy("created_at");
      return res.json(data);
    } catch (err) {
      res.status(400).send("Erro ao localizar as transferências");
    }
  },
  async create(req, res) {
    const data = req.body;
    try {
      const transferenciaId = await connection("transferencias").insert(data);
      return res.status(200).send({ message: "Inserido com sucesso", id: transferenciaId });
    } catch (err) {
      return res.status(400).send({ message: "Contate o administrador" + err });
    }
  },
  async update(req, res) {
    const data = req.body;

    try {
      const { id } = req.params;

      await validation.id.validateAsync({
        id: id,
      });

      await connection("transferencias").where({ id: id }).update(data);
      return res.status(200).send({ message: "Alterado com sucesso" });
    } catch (err) {
      return res.status(400).send({ message: "Contate o administrador" + err });
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    await validation.id.validateAsync({
      id: id,
    });

    await connection("transferencias")
      .where({ id: id })
      .delete()
      .then(() => {
        return res.status(204).send("Excluído com sucesso");
      })
      .catch((err) => {
        return res.status(400).send({ message: "Erro ao excluir transferência" });
      });
  },
  async findById(req, res) {
    const { id } = req.params;

    await validation.id.validateAsync({
      id: id,
    });

    await connection("transferencias")
      .select("*")
      .where("id", id)
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        return res.status(400).send({ message: "Erro ao localizar transferência" });
      });
  },
  async search(req, res) {
    const { initialDate, finalDate, numeroControle, filialDestino } = req.body;

    await validation.searchSchema.validateAsync({
      initialDate: initialDate,
      finalDate: finalDate,
      numeroControle: numeroControle,
      filialDestino: filialDestino,
    });

    if (initialDate === "" && finalDate === "" && numeroControle === "" && filialDestino === "") {
      return res.status(400).send({ message: "É necessário preencher algum campo da pesquisa" });
    }

    if (initialDate !== "" && finalDate === "") {
      return res.status(400).send({ message: "É necessário preencher a data final" });
    }

    if (initialDate > finalDate) {
      return res.status(400).send({ message: "Data inicial maior que a final" });
    }

    await connection("transferencias")
      .select("*")
      .modify(function (queryBuilder) {
        if (initialDate !== "" && finalDate !== "") {
          queryBuilder.whereBetween("dataAtual", [initialDate, finalDate]);
        }
        if (numeroControle !== "") {
          queryBuilder.where("numeroControle", numeroControle);
        }
        if (filialDestino !== "") {
          queryBuilder.where("filialDestino", filialDestino);
        }
      })
      .orderBy("created_at", "desc")
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        return res.status(400).send({ message: "Erro ao localizar" + err });
      });
  },
};
