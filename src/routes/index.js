var express = require('express');
const route = express.Router();

route.get("/", (req, res) => {
    res.send("Hello from main page")
});

module.exports = route;