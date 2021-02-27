'use strict';

var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');

// Registro de nuevo usuario
router.post('/', UserController.registerUser);

// Modificación de datos de usuario
router.put('/:id', UserController.updateUser);

// Login
router.get('/login/', UserController.login);

// Ver datos de usuario
router.get('/find/:id', UserController.userInfo);

module.exports = router;