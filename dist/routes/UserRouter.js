'use strict';

var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');
var middleware = require('../../middleware');

// Registro de nuevo usuario
router.post('/create', UserController.registerUser);

// Modificación de datos de usuario
router.put('/:id', [middleware.ensureAuthenticated, middleware.ensureActiveUserInfo()], UserController.updateUser);

// Login
router.get('/login/', UserController.login);

// Ver datos de usuario
router.get('/find/:id', [middleware.ensureAuthenticated, middleware.ensureActiveUserInfo()], UserController.userInfo);

module.exports = router;