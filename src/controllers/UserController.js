const express = require('express');
const bodyParser = require('body-parser');
const UserModel = require("../models/UserModel")
import { UserRepository } from '../models/UserModel';
import { RolRepository } from '../models/RolModel';
import { getCustomRepository } from 'typeorm';
const UserController = {};

// Registro de usuario 
UserController.registerUser = async(req,res) => {
try {
    console.log("1");
    const userRepository = new getCustomRepository(UserRepository);
    console.log("2");
    const userCreated = await userRepository.createUser(req.body);
    res.json(userCreated)}
    catch(error) {
        throw error;
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
        const login = await userRepository.login(username, password);
        res.json(login);
    }
        catch(error) {
            return error;
        }
    }

//User Info
UserController.userInfo = async(req,res) => {
    const userRepository = new getCustomRepository(UserRepository);
    const userInfo = await userRepository.getUserInfo(req.params.id);
    var newUserInfo = [{id: userInfo.id, userName: userInfo.userName, firstName: userInfo.firstName, lastName: userInfo.lastName, email: userInfo.email, rol: userInfo.rol}]
    res.json(newUserInfo);
  }

module.exports = UserController;