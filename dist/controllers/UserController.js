'use strict';

var _UserModel = require('../models/UserModel');

var _typeorm = require('typeorm');

var _Users = require('../entities/Users');

var express = require('express');
var bodyParser = require('body-parser');
var UserModel = require("../models/UserModel");

var service = require('../../services.js');

// const service = require('../../services.js');
var bcrypt = require("bcryptjs");
var UserController = {};

// Registro de usuario 
UserController.registerUser = async function (req, res) {
    try {
        console.log('Registrando usuario...');
        console.log('Hasheando datos privados...');
        // Con los datos de la request, hasheado aquellos que sean datos privados
        var user = req.body;
        user.password = await bcrypt.hash(user.password, 2);
        user.firstName = await bcrypt.hash(user.firstName, 2);
        user.lastName = await bcrypt.hash(user.lastName, 2);
        user.email = await bcrypt.hash(user.email, 2);
        console.log('OK');
        console.log('Guardando nuevo usuario...');
        // Guardo los datos en el repositorio de Users
        var savedUser = await new _typeorm.getRepository(_Users.User).save(user);
        console.log('OK - Nuevo usuario: ' + savedUser.id);
        console.log('Generando TOKEN de sesi\xF3n...');
        // Creo el token para iniciar sesión con el usuario
        var token = service.createToken(savedUser.id, savedUser.rol);
        console.log('OK - Token: ' + token);
        // Devuelvo  el id creado y el token
        res.status(201).send({ id: savedUser.id, token: token });
    } catch (error) {
        console.log('ERROR: ' + error);
        res.status(200).send(error);
    }
};

//Modificación de datos de usuario
UserController.updateUser = async function (req, res) {
    {
        try {
            var userRepository = new _typeorm.getCustomRepository(_UserModel.UserRepository);
            var userUpdated = await userRepository.updateUser(req.params.id, req.body);
            res.json(userUpdated);
        } catch (error) {
            res.send(error);
        }
    }
};
// Login
UserController.login = async function (req, res) {
    try {
        // Busco un usuario que coincida con el username que viene en la request
        console.log('Buscando usuario existente...');
        var user = await new _typeorm.getRepository(_Users.User).findOne({ where: { userName: req.body.username }, select: ["id", "userName", "password"], relations: ["rol"] });
        // Chequea que el encuentre un usuario
        if (user === 'undefined' || user.length <= 0) {
            // Si no encuentra => Devuelve error al usuario
            console.log('ERROR - El usuario no existe');
            res.status(200).send("Usuario no existe");
        }
        // Si lo encuentra, compara la contraseña de la request con la guardada
        // Primero hashea la contraseña
        console.log('OK - Usuario encontrado: ' + user.id);
        console.log('Chequeando password...');
        var validPassword = await bcrypt.compare(req.body.password, user.password);
        // Si devuelve FALSE (no son iguales) => Devuelve error al usuario
        if (!validPassword) {
            console.log('ERROR - La contrase\xF1a es incorrecta');
            res.status(401).send("La contraseña es incorrecta");
        }
        // Si devuelve TRUE (son iguales) => Crea el TOKEN de la sesión y lo devuelve al usuario
        else {
                console.log('OK - Password correcto');
                console.log('Creando TOKEN...');
                var token = service.createToken(user.id, user.rol.rolId);
                console.log('OK - Token ' + token);
                res.status(200).send({ token: token });
            }
    } catch (error) {
        console.log('ERROR: ' + error);
        res.status(200).send(error);
    }
};

//User Info
UserController.userInfo = async function (req, res) {
    var userRepository = new _typeorm.getCustomRepository(_UserModel.UserRepository);
    var userInfo = await userRepository.getUserInfo(req.params.id);
    var newUserInfo = [{ id: userInfo.id, userName: userInfo.userName, firstName: userInfo.firstName, lastName: userInfo.lastName, email: userInfo.email, rol: userInfo.rol }];
    res.json(userInfo);
};

module.exports = UserController;