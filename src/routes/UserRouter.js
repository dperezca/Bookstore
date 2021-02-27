const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Registro de nuevo usuario
router.post('/', UserController.registerUser);

// Modificación de datos de usuario
router.put('/:id', UserController.updateUser);

module.exports = router;