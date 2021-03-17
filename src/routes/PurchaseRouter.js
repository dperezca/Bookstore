const express = require('express');
const router = express.Router();
const PurchaseController = require('../controllers/PurchaseController');

// Nueva compra
router.post('/', PurchaseController.newPurchase);

// Listado de todas las compras
router.get('/', PurchaseController.showPurchases);



module.exports = router;