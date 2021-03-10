'use strict';

var express = require('express');
var PurchaseRouter = express.Router();
var ProductController = require('../controllers/ProductController');

// Crear un nuevo producto
PurchaseRouter.post('/create', ProductController.createProduct);

//Buscar producto por ID
PurchaseRouter.get('/find/:id', ProductController.findById);

//Buscar por query
PurchaseRouter.get('/find', ProductController.findByQuery);

//Update
PurchaseRouter.put('/update/:id', ProductController.updateById);

module.exports = PurchaseRouter;