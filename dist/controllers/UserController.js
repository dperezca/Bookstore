'use strict';

var _UserModel = require('../models/UserModel');

var _RolModel = require('../models/RolModel');

var _typeorm = require('typeorm');

var express = require('express');
var bodyParser = require('body-parser');
var UserModel = require("../models/UserModel");

var UserController = {};

// Registro de usuario 
UserController.registerUser = async function (req, res) {
    try {
        console.log("1");
        var userRepository = new _typeorm.getCustomRepository(_UserModel.UserRepository);
        console.log("2");
        var userCreated = await userRepository.createUser(req.body);
        res.json(userCreated);
    } catch (error) {
        throw error;
    }
};

//Modificación de datos de usuario
UserController.updateUser = async function (req, res) {
    try {
        var userRepository = new _typeorm.getCustomRepository(_UserModel.UserRepository);
        var userUpdated = await userRepository.updateUser(req.params.id, req.body);
        res.json(userUpdated);
    } catch (error) {
        return error;
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
    var userRepository = new _typeorm.getCustomRepository(_UserModel.UserRepository);
    var userInfo = await userRepository.getUserInfo(req.params.id);
    var newUserInfo = [{ id: userInfo.id, userName: userInfo.userName, firstName: userInfo.firstName, lastName: userInfo.lastName, email: userInfo.email, rol: userInfo.rol }];
    res.json(newUserInfo);
};

module.exports = UserController;