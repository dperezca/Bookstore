const express = require('express');
const bodyParser = require('body-parser');
import {createConnection} from 'typeorm';

const app = express();
app.use(bodyParser.json());

// Iniciando server
app.listen(3000, () => console.log("Servidor activo"));

// Conexión a base de datos
createConnection()
.then(async connection=>{
    console.log("Conectado a la base de datos");
})
.catch(error=>console.error(error))



