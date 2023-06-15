var express = require('express');
const route = express.Router();
const autenticarToken = require("../middlewares/auth");
const transportadorController = require("../controllers/transportadorController");

route.get(
    "/",
    autenticarToken,
    transportadorController.index);

route.get(
    "/findById/:id",
    autenticarToken,
    transportadorController.findById
);

route.get(
    "/findByName/:name",
    autenticarToken,
    transportadorController.findByName
);

route.get(
    "/findByFilialAtendida/:filialAtendida",
    autenticarToken,
    transportadorController.findByFilialAtendida
);

route.post(
    "/create",
    autenticarToken,
    transportadorController.create
);

route.post(
    "/find",
    autenticarToken,
    transportadorController.find
);

route.put(
    "/update/:id",
    autenticarToken,
    transportadorController.update
);

route.delete(
    "/delete/:id",
    autenticarToken,
    transportadorController.delete
);

module.exports = route;