const Joi = require("joi");

const id = Joi.object({
  id: Joi.number().integer().max(1000000000).messages({
    "number.base": "O id precisa ser um número",
    "number.max": "Número de caracteres excedido",
  }),
});

const searchSchema = Joi.object({
  initialDate: Joi.string().allow("").max(10).min(8).messages({
    "string.base": "A data inicial está em formato inválido",
    "string.min": "A data inicial deve ter entre 8 e 10 caracteres",
    "string.max": "A data inicial deve entre 8 e 10 caracteres",
    "string.empty": "A data inicial não pode estar vazio",
    "any.required": "A data inicial deve ser preenchido",
  }),
  finalDate: Joi.string().allow("").max(10).min(8).messages({
    "string.base": "A data final está em formato inválido",
    "string.min": "A data final deve ter entre 8 e 10 caracteres",
    "string.max": "A data final deve ter entre 8 10 caracteres",
    "string.empty": "A data final não pode estar vazio",
    "any.required": "A data final deve ser preenchido",
  }),
  filialOrigem: Joi.string().allow("").max(10).messages({
    "string.base": "O número de controle está em formato inválido",
    "string.min": "O número de controle deve ter 10 caracteres",
    "string.max": "O número de controle deve ter 10 caracteres",
    "string.empty": "O número de controle não pode estar vazio",
    "any.required": "O número de controle deve ser preenchido",
  }),
  filialDestino: Joi.string().allow("").max(10).messages({
    "string.base": "O campo número da filial deve conter somente números",
    "string.max": "Número de caracteres excedido",
    "string.empty": "O número da filial não pode estar vazio",
    "any.required": "O número da filial deve ser preenchido",
  }),
});

module.exports = { id, searchSchema };
