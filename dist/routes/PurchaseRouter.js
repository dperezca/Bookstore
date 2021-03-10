'use strict';

var express = require('express');
var router = express.Router();
var PurchaseController = require('../controllers/PurchaseController');

// Nueva compra
router.post('/', PurchaseController.newPurchase);

module.exports = router;