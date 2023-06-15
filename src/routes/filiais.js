var express = require('express');
const route = express.Router();
const autenticarToken = require("../middlewares/auth");
const filiaisController = require("../controllers/filiaisController");

route.get(
    "/",
    autenticarToken,
    filiaisController.index
);

route.get(
    "/findById/:id",
    autenticarToken,
    filiaisController.findById);

route.get(
    "/findByNumeroFilial/:numeroFilial",
    autenticarToken,
    filiaisController.findByNumeroFilial
);

route.post(
    "/create",
    autenticarToken,
    filiaisController.create
);

route.delete(
    "/delete/:id",
    autenticarToken,
    filiaisController.delete
);

route.put(
    "/update/:id",
    autenticarToken,
    filiaisController.update
);

module.exports = route;