const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Registro de nuevo usuario
router.post('/', UserController.registerUser);

// Modificación de datos de usuario
router.put('/:id', UserController.updateUser);

// Login
router.get('/login/', UserController.login);

// Ver datos de usuario
router.get('/find/:id', UserController.userInfo);

module.exports = router;