var express = require("express");
const route = express.Router();
const autenticarToken = require("../middlewares/auth");
const estoqueController = require("../controllers/estoqueController");

route.get("/", autenticarToken, estoqueController.index);

route.get("/findById/:id", autenticarToken, estoqueController.findById);

route.post("/create", autenticarToken, estoqueController.create);

route.post("/search", autenticarToken, estoqueController.search);

route.put("/update/:id", autenticarToken, estoqueController.update);

route.delete("/delete/:id", autenticarToken, estoqueController.delete);

module.exports = route;
