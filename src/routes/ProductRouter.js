const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// Crear un nuevo producto
router.post('/create', ProductController.createProduct);

//Buscar producto por ID
router.get('/find/:id', ProductController.findById);

//Buscar por query
router.get('/find', ProductController.findByQuery);

//Update
router.put('/update/:id', ProductController.updateById);



module.exports = router;