var express = require("express");
const route = express.Router();
const autenticarToken = require("../middlewares/auth");
const saidaController = require("../controllers/saidaController");

route.get("/", autenticarToken, saidaController.index);

route.get("/findById/:id", autenticarToken, saidaController.findById);

route.post("/create", autenticarToken, saidaController.create);

route.post("/search", autenticarToken, saidaController.search);

route.put("/update/:id", autenticarToken, saidaController.update);

route.delete("/delete/:id", autenticarToken, saidaController.delete);

module.exports = route;
