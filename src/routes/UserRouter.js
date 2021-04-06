const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const middleware = require('../../middleware');



// Registro de nuevo usuario
router.post('/create', UserController.registerUser);

// Registro de nuevo usuario
router.get('/create', (req, res) => {
    res.render('createUser');
});

// Modificación de datos de usuario
router.put('/:id', [middleware.ensureAuthenticated, middleware.ensureActiveUserInfo()], UserController.updateUser);

// Login
router.get('/login/', UserController.login);

// Ver datos de usuario
router.get('/find/:id', [middleware.ensureAuthenticated, middleware.ensureActiveUserInfo()], UserController.userInfo);

module.exports = router;