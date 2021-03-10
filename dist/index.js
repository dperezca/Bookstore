'use strict';

var _typeorm = require('typeorm');

var _UserRouter = require('./routes/UserRouter');

var _UserRouter2 = _interopRequireDefault(_UserRouter);

var _ProductRouter = require('./routes/ProductRouter');

var _ProductRouter2 = _interopRequireDefault(_ProductRouter);

var _PurchaseRouter = require('./routes/PurchaseRouter');

var _PurchaseRouter2 = _interopRequireDefault(_PurchaseRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// Gestión de usuario
app.use('/users', _UserRouter2.default);

// Gestión de producto
app.use('/products', _ProductRouter2.default);

//Gestión de compras
app.use('/purchase', _PurchaseRouter2.default);