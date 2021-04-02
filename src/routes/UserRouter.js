const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const middleware = require('../../middleware');



// Registro de nuevo usuario
router.post('/', UserController.registerUser);

// Modificación de datos de usuario
router.put('/:id', middleware.ensureAuthenticated, UserController.updateUser);

// Login
router.get('/login/', UserController.login);

// Ver datos de usuario
router.get('/find/:id', [middleware.ensureAuthenticated, middleware.ensureAuthenticatedVend([1,3])], UserController.userInfo);

module.exports = router;