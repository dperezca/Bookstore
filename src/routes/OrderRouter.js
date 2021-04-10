const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const middleware = require('../../middleware');

// Nueva compra
router.post('/', [middleware.ensureAuthenticated, middleware.ensureOnlySomeRoles([1,2])], OrderController.newOrder);

// Listado de todas las compras => Restringido a ADMIN y COMPRADORES
router.get('/', [middleware.ensureAuthenticated, middleware.ensureOnlySomeRoles([1,2])], OrderController.showOrders);

//Compras por usuario => Restringido a ADMIN y COMPRADOR de la orden
router.get('/users/:id', [middleware.ensureAuthenticated, middleware.ensureActiveUserInfo()], OrderController.showOrdersUser);

//Actualizar compra (datos de factura)
//Restringido: unicamente las puede ver el usuario que haya comprado o con rol = admin
router.put('/:order', [middleware.ensureAuthenticated, middleware.ensureOnlySomeRoles([1,2,3])], OrderController.checkIfBuyer,OrderController.updateOrder);

module.exports = router;