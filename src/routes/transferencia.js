var express = require('express');
const route = express.Router();
const autenticarToken = require("../middlewares/auth");
const transferenciaController = require("../controllers/transferenciaController");

route.get(
    "/",
    autenticarToken,
    transferenciaController.index
);

route.get(
    "/findById/:id",
    autenticarToken,
    transferenciaController.findById
);

route.post(
    "/create",
    autenticarToken,
    transferenciaController.create
);

route.post(
    "/search",
    autenticarToken,
    transferenciaController.search
);

route.put(
    "/update/:id",
    autenticarToken,
    transferenciaController.update
);

route.delete(
    "/delete/:id",
    autenticarToken,
    transferenciaController.delete
);

module.exports = route;