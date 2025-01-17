'use strict';

var _typeorm = require('typeorm');

var _UserRouter = require('./routes/UserRouter');

var _UserRouter2 = _interopRequireDefault(_UserRouter);

var _ProductRouter = require('./routes/ProductRouter');

var _ProductRouter2 = _interopRequireDefault(_ProductRouter);

var _OrderRouter = require('./routes/OrderRouter');

var _OrderRouter2 = _interopRequireDefault(_OrderRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var bodyParser = require('body-parser');

var exphbs = require('express-handlebars');

var app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Iniciando server
app.listen(3000, function () {
    return console.log("Servidor activo");
});
app.use(express.static('public'));

//Handlebars
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

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
app.use('/orders', _OrderRouter2.default);

//Home
app.get('/', function (req, res) {
    res.render('home');
});