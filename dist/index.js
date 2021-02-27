'use strict';

var _typeorm = require('typeorm');

var express = require('express');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.json());

// Iniciando server
app.listen(3000, function () {
    return console.log("Servidor activo");
});

// Conexión a base de datos
(0, _typeorm.createConnection)().then(async function (connection) {
    console.log("Conectado a la base de datos");
}).catch(function (error) {
    return console.error(error);
});