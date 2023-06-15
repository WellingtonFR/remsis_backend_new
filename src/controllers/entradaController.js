const connection = require("../db/connection");
const validation = require("../validations/entradaValidation");

module.exports = {
  async index(req, res) {
    try {
      const data = await connection("entrada").orderBy("created_at");
      return res.json(data);
    } catch (err) {
      res.status(400).send("Erro ao localizar as transferências");
    }
  },
  async create(req, res) {
    const data = req.body;
    try {
      const transferenciaId = await connection("entrada").insert(data);
      return res
        .status(200)
        .send({ message: "Inserido com sucesso", id: transferenciaId });
    } catch (err) {
      return res.status(400).send({ message: "Contate o administrador" + err });
    }
  },
  async update(req, res) {
    const data = req.body;

    try {
      const { id } = req.params;

      await validation.id
        .validateAsync({
          id: id,
        })
        .catch((err) => {
          return res.status(400).send({ message: err.details[0].message });
        });

      await connection("entrada").where({ id: id }).update();
      return res.status(200).send({ message: "Alterado com sucesso" });
    } catch (err) {
      return res.status(400).send({ message: "Contate o administrador" + err });
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

    await connection("entrada")
      .where({ id: id })
      .delete()
      .then(() => {
        return res.status(204).send("Excluído com sucesso");
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ message: "Erro ao excluir transferência" });
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

    await connection("entrada")
      .select("*")
      .where("id", id)
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ message: "Erro ao localizar transferência" });
      });
  },
  async search(req, res) {
    const { initialDate, finalDate, filialDestino } = req.body;

    await validation.searchSchema.validateAsync({
      initialDate: initialDate,
      finalDate: finalDate,
      filialDestino: filialDestino,
    });

    if (initialDate === "" && finalDate === "" && filialDestino === "") {
      return res
        .status(400)
        .send({ message: "É necessário preencher algum campo da pesquisa" });
    }

    if (initialDate !== "" && finalDate === "") {
      return res
        .status(400)
        .send({ message: "É necessário preencher a data final" });
    }

    if (initialDate > finalDate) {
      return res
        .status(400)
        .send({ message: "Data inicial maior que a final" });
    }

    await connection("entrada")
      .select("*")
      .modify(function (queryBuilder) {
        if (initialDate !== "" && finalDate !== "") {
          queryBuilder.whereBetween("dataAtual", [initialDate, finalDate]);
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
