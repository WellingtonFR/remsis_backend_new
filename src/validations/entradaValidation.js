const Joi = require("joi");

const id = Joi.object({
  id: Joi.number().integer().max(1000000000).messages({
    "number.base": "O id precisa ser um número",
    "number.max": "Número de caracteres excedido",
  }),
});

module.exports = { id };
