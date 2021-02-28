'use strict';

var express = require('express');
var router = express.Router();
var ProductController = require('../controllers/ProductController');

// Crear un nuevo producto
router.get('/create', ProductController.createProduct);

module.exports = router;