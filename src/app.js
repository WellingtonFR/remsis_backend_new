const express = require('express')
const port = process.env.NODE_DOCKER_PORT || 3001
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")
require('dotenv').config()

const app = express()

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
const index_route = require('./routes/index');
const conferentes_route = require("./routes/conferente");
const filiais_route = require("./routes/filiais");
const transferencia_route = require("./routes/transferencia");
const transportador_route = require("./routes/transportador");
const entrada_route = require("./routes/entrada");
const auth_route = require("./routes/auth");

app.use('/', index_route);
app.use('/conferente', conferentes_route);
app.use('/filiais', filiais_route);
app.use('/transferencia', transferencia_route);
app.use('/transportador', transportador_route);
app.use('/entrada', entrada_route);
app.use('/auth', auth_route);

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('Error' + err.status);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
