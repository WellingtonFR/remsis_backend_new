const connection = require("../db/connection");
const validation = require("../validations/estoqueValidation");

module.exports = {
  async index(req, res) {
    try {
      const data = await connection("entrada").orderBy("created_at").where("enviado", false);
      return res.json(data);
    } catch (err) {
      res.status(400).send({ message: "Erro ao localizar as transferências" });
    }
  },
  async create(req, res) {
    const data = req.body.formFields;
    try {
      data.forEach(async (item) => {
        console.log(item);
        await connection("entrada").insert(item);
      });
      return res.status(200).send({ message: "Inserido com sucesso" });
    } catch (err) {
      return res.status(400).send({ message: "Contate o administrador" + err });
    }
  },
  async update(req, res) {
    const data = req.body.formFields;

    try {
      const { id } = req.params;

      await validation.id.validateAsync({
        id: id,
      });

      await connection("entrada").where({ id: id }).update();
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

    await connection("entrada")
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

    await connection("entrada")
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
    const { initialDate, finalDate, filialOrigem, filialDestino } = req.body;

    let _finalDate = new Date(finalDate);
    _finalDate.setDate(_finalDate.getDate() + 1);

    await validation.searchSchema.validateAsync({
      initialDate: initialDate,
      finalDate: finalDate,
      filialOrigem: filialOrigem,
      filialDestino: filialDestino,
    });

    if (initialDate === "" && finalDate === "" && filialDestino === "" && filialOrigem === "") {
      return res.status(400).send({ message: "É necessário preencher algum campo da pesquisa" });
    }

    if (initialDate !== "" && finalDate === "") {
      return res.status(400).send({ message: "É necessário preencher a data final" });
    }

    if (initialDate > finalDate) {
      return res.status(400).send({ message: "Data inicial maior que a final" });
    }

    await connection("entrada")
      .select("*")
      .modify(function (queryBuilder) {
        if (initialDate !== "" && finalDate !== "") {
          queryBuilder.whereBetween("created_at", [initialDate, _finalDate]);
        }
        if (filialOrigem !== "") {
          queryBuilder.where("filialOrigem", filialOrigem);
        }
        if (filialDestino !== "") {
          queryBuilder.where("filialDestino", filialDestino);
        }
        queryBuilder.where("enviado", false);
      })
      .orderBy("created_at", "asc")
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        return res.status(400).send({ message: "Erro ao localizar" + err });
      });
  },
};
