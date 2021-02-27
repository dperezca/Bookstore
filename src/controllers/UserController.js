const express = require('express');
const bodyParser = require('body-parser');
const UserModel = require("../models/UserModel")
import { UserRepository } from '../models/UserModel';
import { getCustomRepository } from 'typeorm';
import { User } from '../entities/Users';
const UserController = {};

// Registro de usuario 
UserController.registerUser = async(req,res) => {
try {
    const userRepository = new getCustomRepository(UserRepository);
    const userCreated = await userRepository.createUser(req.body);
    res.json(userCreated)}
    catch(error) {
        return error;
    }
}

module.exports = UserController;