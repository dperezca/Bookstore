const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const middleware = require('../../middleware');

// Crear un nuevo producto
router.post('/create', [middleware.ensureAuthenticated, middleware.ensureOnlySomeRoles([1,3])], ProductController.createProduct);

//Buscar producto por ID
router.get('/find/:id', ProductController.findById);

//Buscar por query
router.get('/find', ProductController.findByQuery);

//Mostrar todos
router.get('/', ProductController.findAll);

//Más vendidos
router.get('/bestsellers/', ProductController.bestSellers);

//Update
router.put('/update/:id', [middleware.ensureAuthenticated, middleware.ensureOnlySomeRoles([1,3])], ProductController.checkIfCreator, ProductController.updateById);

//Delete
router.delete('/delete/:id', [middleware.ensureAuthenticated, middleware.ensureOnlySomeRoles([1,3])], ProductController.checkIfCreator, ProductController.delete);

module.exports = router;