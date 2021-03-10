const express = require('express');
const router = express.Router();
const PurchaseController = require('../controllers/PurchaseController');

// Nueva compra
router.post('/', PurchaseController.newPurchase);





module.exports = router;