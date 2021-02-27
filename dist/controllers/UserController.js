'use strict';

var _UserModel = require('../models/UserModel');

var _typeorm = require('typeorm');

var _Users = require('../entities/Users');

var express = require('express');
var bodyParser = require('body-parser');
var UserModel = require("../models/UserModel");

var UserController = {};

// Registro de usuario 
UserController.registerUser = async function (req, res) {
    try {
        var userRepository = new _typeorm.getCustomRepository(_UserModel.UserRepository);
        var userCreated = await userRepository.createUser(req.body);
        res.json(userCreated);
    } catch (error) {
        return error;
    }
};

module.exports = UserController;