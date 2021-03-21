const express = require('express');
const PurchaseRouter = express.Router();
const ProductController = require('../controllers/ProductController');
const middleware = require('../../middleware');

// Crear un nuevo producto
PurchaseRouter.post('/create', ProductController.createProduct);

//Buscar producto por ID
PurchaseRouter.get('/find/:id', ProductController.findById);

//Buscar por query
PurchaseRouter.get('/find', middleware.ensureAuthenticatedVend, ProductController.findByQuery);

//Update
PurchaseRouter.put('/update/:id', ProductController.updateById);



module.exports = PurchaseRouter;