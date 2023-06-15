var express = require('express');
const route = express.Router();
const autenticarToken = require("../middlewares/auth");
const conferenteController = require("../controllers/conferenteController");

route.get(
    "/",
    autenticarToken,
    conferenteController.index
);

route.post(
    "/create",
    autenticarToken,
    conferenteController.create
);

route.get(
    "/findByIdConferente/:idConferente",
    autenticarToken,
    conferenteController.findByIdConferente
);

route.delete(
    "/delete/:id",
    autenticarToken,
    conferenteController.delete
);

module.exports = route;