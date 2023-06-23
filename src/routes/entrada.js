var express = require("express");
const route = express.Router();
const autenticarToken = require("../middlewares/auth");
const entradaController = require("../controllers/entradaController");

route.get("/", autenticarToken, entradaController.index);

route.get("/findById/:id", autenticarToken, entradaController.findById);

route.get("/findByFilialDestino/:filialDestino", autenticarToken, entradaController.findByFilialDestino);

route.post("/create", autenticarToken, entradaController.create);

route.post("/search", autenticarToken, entradaController.search);

route.put("/update/:id", autenticarToken, entradaController.update);

route.delete("/delete/:id", autenticarToken, entradaController.delete);

module.exports = route;
