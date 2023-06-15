var express = require("express");
const route = express.Router();
const authController = require("../controllers/authController");

//Usuário
route.post("/register", authController.register);

//Autenticação
route.post("/login", authController.login);
route.post("/logout", authController.logout);

module.exports = route;
