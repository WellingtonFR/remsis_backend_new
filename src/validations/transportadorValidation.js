const Joi = require("joi");

const transportadorSchema = Joi.object({
  nomeTransportador: Joi.string().min(3).max(70).required().messages({
    "string.base": "O nome do transportador está em formato inválido",
    "string.min": "O nome do transportador  deve ter no minímo 3 caracteres",
    "string.max": "O nome do transportador deve ter no máximo 70 caracteres",
    "string.empty": "O campo nome do transportador não pode estar vazio",
    "any.required": "O nome do transportador deve ser preenchido",
  }),
  placaVeiculo: Joi.string().min(7).max(10).required().messages({
    "string.base": "A placa do veículo está em formato inválido",
    "string.min": "A placa do veículo deve ter no minímo 7 caracteres",
    "string.max": "A placa do veículo deve ter no máximo 10 caracteres",
    "string.empty": "O campo placa do veículo não pode estar vazio",
    "any.required": "A placa do veículo deve ser preenchida",
  }),
  filialAtendida: Joi.number().max(9999999999).allow(0).messages({
    "number.base": "O campo filial atendida está em formato inválido",
    "number.max": "O campo filial atendida deve ter no máximo 10 caracteres",
  }),
});

const id = Joi.object({
  id: Joi.number().integer().max(1000000000).messages({
    "number.base": "O id precisa ser um número",
    "number.max": "Número de caracteres excedido",
  }),
});

module.exports = { transportadorSchema, id };
