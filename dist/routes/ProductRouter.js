'use strict';

var express = require('express');
var PurchaseRouter = express.Router();
var ProductController = require('../controllers/ProductController');
var middleware = require('../../middleware');

// Crear un nuevo producto
PurchaseRouter.post('/create', [middleware.ensureAuthenticated, middleware.ensureOnlySomeRoles([1, 3])], ProductController.createProduct);

//Buscar producto por ID
PurchaseRouter.get('/find/:id', ProductController.findById);

//Buscar por query
PurchaseRouter.get('/find', middleware.ensureAuthenticated, ProductController.findByQuery);

//Update
PurchaseRouter.put('/update/:id', [middleware.ensureAuthenticated, middleware.ensureOnlySomeRoles([1, 3])], ProductController.updateById);

module.exports = PurchaseRouter;