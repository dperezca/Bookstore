'use strict';

var express = require('express');
var router = express.Router();
var OrderController = require('../controllers/OrderController');
var middleware = require('../../middleware');

// Nueva compra
router.post('/', [middleware.ensureAuthenticated, middleware.ensureOnlySomeRoles([1, 2])], OrderController.newOrder);

// Listado de todas las compras => Restringido a ADMIN y COMPRADORES
router.get('/', [middleware.ensureAuthenticated, middleware.ensureOnlySomeRoles([1, 2])], OrderController.showOrders);

//Compras por usuario => Restringido a ADMIN y COMPRADOR de la orden
router.get('/users/:id', [middleware.ensureAuthenticated, middleware.ensureActiveUserInfo()], OrderController.showOrdersUser);

//Actualizar compra (datos de factura)
//Restringido: unicamente las puede ver el usuario que haya comprado o con rol = admin
router.put('/:order', [middleware.ensureAuthenticated], OrderController.checkIfBuyer, OrderController.updateOrder);

module.exports = router;