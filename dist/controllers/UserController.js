'use strict';

var _UserModel = require('../models/UserModel');

var _typeorm = require('typeorm');

var express = require('express');
var bodyParser = require('body-parser');
var UserModel = require("../models/UserModel");

var service = require('../../services.js');

var UserController = {};

// Registro de usuario 
UserController.registerUser = async function (req, res) {
    try {
        var userRepository = new _typeorm.getCustomRepository(_UserModel.UserRepository);
        var userCreated = await userRepository.createUser(req.body);
        console.log("user", userCreated);
        var token = service.createToken(userCreated.id, userCreated.rol);
        res.status(201).send({ id: userCreated.id, token: token });
    } catch (error) {
        res.status(401).send(error);
    }
};

//Modificación de datos de usuario
UserController.updateUser = async function (req, res) {
    // Con la información del TOKEN controla que el usuario sea ADMIN o sea pida la información del usuario logueado
    if (req.rol === 1 || req.user == req.params.id) {
        try {
            var userRepository = new _typeorm.getCustomRepository(_UserModel.UserRepository);
            var userUpdated = await userRepository.updateUser(req.params.id, req.body);
            res.json(userUpdated);
        } catch (error) {
            return error;
        }
    } else {
        res.status(200).send("No esta autorizado a modificar este usuario");
    }
};
// Login
UserController.login = async function (req, res) {
    try {
        var userRepository = new _typeorm.getCustomRepository(_UserModel.UserRepository);
        var body = req.body;

        var username = body.username;
        var password = body.password;
        var login = await userRepository.login(username, password);
        res.status(200).send({ token: login });
    } catch (error) {
        return error;
    }
};

//User Info
UserController.userInfo = async function (req, res) {
    // Con la información del TOKEN controla que el usuario sea ADMIN o sea pida la información del usuario logueado
    if (req.rol === 1 || req.user == req.params.id) {
        console.log(req.params.id);
        var userRepository = new _typeorm.getCustomRepository(_UserModel.UserRepository);
        var userInfo = await userRepository.getUserInfo(req.params.id);
        var newUserInfo = [{ id: userInfo.id, userName: userInfo.userName, firstName: userInfo.firstName, lastName: userInfo.lastName, email: userInfo.email, rol: userInfo.rol }];
        res.json(userInfo);
    } else {
        res.status(401).send("No está autorizado a ver la información de otro usuario");
    }
};

module.exports = UserController;