'use strict';

var express = require('express');
var router = express.Router();
var OrderController = require('../controllers/OrderController');
var middleware = require('../../middleware');

// Nueva compra
router.post('/', [middleware.ensureAuthenticated, middleware.ensureOnlySomeRoles([1, 2])], OrderController.newOrder);

// Listado de todas las compras
router.get('/', OrderController.showOrders);

module.exports = router;