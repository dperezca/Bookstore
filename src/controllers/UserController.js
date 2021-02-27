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

//Modificación de datos de usuario
UserController.updateUser = async(req,res) => {
    try {
        const userRepository = new getCustomRepository(UserRepository);
        const userUpdated = await userRepository.updateUser(req.params.id, req.body);
        res.json(userUpdated)}
        catch(error) {
            return error;
        }
    }

// Login
UserController.login = async(req,res) => {
    try {
        const userRepository = new getCustomRepository(UserRepository);
        const {body} = req;
        const username = body.username;
        const password = body.password;
        console.log(username, password);
        const login = await userRepository.login(username, password);
        res.json(login);
    }
        catch(error) {
            return error;
        }
    }

module.exports = UserController;