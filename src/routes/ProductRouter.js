const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// Crear un nuevo producto
router.get('/create', ProductController.createProduct);



module.exports = router;