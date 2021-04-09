const express = require('express');
var bodyParser = require('body-parser')
import {createConnection} from 'typeorm';
import UserRouter from './routes/UserRouter';
import ProductRouter from './routes/ProductRouter';
import OrderRouter  from './routes/OrderRouter';
const exphbs = require('express-handlebars');





const app = express();

app.use(express.urlencoded({
  extended: true
}))

app.use(bodyParser.json());

// Iniciando server
app.listen(3000, () => console.log("Servidor activo"));
app.use(express.static('public'));

//Handlebars
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
}));
app.set('view engine', 'hbs');

// Conexión a base de datos
createConnection()
.then(async connection=>{
    console.log("Conectado a la base de datos");
})
.catch(error=>console.error(error))

// Gestión de usuario
app.use('/users',UserRouter);

// Gestión de producto
app.use('/products',ProductRouter);

//Gestión de compras
app.use('/orders',OrderRouter);

//Home
app.get('/', (req, res) => {
    res.render('home');
});


