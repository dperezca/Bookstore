'use strict';

var express = require('express');
var router = express.Router();
var PurchaseController = require('../controllers/PurchaseController');

// Nueva compra
router.post('/', PurchaseController.newPurchase);

// Listado de todas las compras
router.get('/', PurchaseController.showPurchases);

module.exports = router;