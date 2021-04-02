const express = require('express');
const bodyParser = require('body-parser');
const UserModel = require("../models/UserModel")
import { UserRepository } from '../models/UserModel';
const service = require('../../services.js');
import { getCustomRepository } from 'typeorm';
const UserController = {};

// Registro de usuario 
UserController.registerUser = async(req,res) => {
try {
    const userRepository = new getCustomRepository(UserRepository);
    const userCreated = await userRepository.createUser(req.body);
    const token = service.createToken(userCreated.id, userCreated.rol);
    res.status(201).send({id: userCreated.id, token: token});
   }
    catch(error) {
        res.status(401).send(error);
    }
}

//Modificación de datos de usuario
UserController.updateUser = async(req,res) => {
       // Con la información del TOKEN controla que el usuario sea ADMIN o sea pida la información del usuario logueado
       if (req.rol === 1 || req.user == req.params.id) {
    try {
        const userRepository = new getCustomRepository(UserRepository);
        const userUpdated = await userRepository.updateUser(req.params.id, req.body);
        res.json(userUpdated)}
        catch(error) {
            return error;
        }
    }
    else {
        res.status(200).send("No esta autorizado a modificar este usuario");
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
        res.status(200).send({token: login});
    }
        catch(error) {
            return error;
        }
    }

//User Info
UserController.userInfo = async(req,res) => {
    // Con la información del TOKEN controla que el usuario sea ADMIN o sea pida la información del usuario logueado
    if (req.rol === 1 || req.user == req.params.id) {
        console.log(req.params.id);
    const userRepository = new getCustomRepository(UserRepository);
    const userInfo = await userRepository.getUserInfo(req.params.id);
    var newUserInfo = [{id: userInfo.id, userName: userInfo.userName, firstName: userInfo.firstName, lastName: userInfo.lastName, email: userInfo.email, rol: userInfo.rol}]
    res.json(userInfo);}
    else {
        res.status(401).send("No está autorizado a ver la información de otro usuario")
    }
  }

module.exports = UserController;