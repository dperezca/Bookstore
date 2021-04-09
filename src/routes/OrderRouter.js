const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const middleware = require('../../middleware');

// Nueva compra
router.post('/', [middleware.ensureAuthenticated, middleware.ensureOnlySomeRoles([1,2])], OrderController.newOrder);

// Listado de todas las compras
router.get('/', OrderController.showOrders);



module.exports = router;