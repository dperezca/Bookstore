const express = require('express');
const bodyParser = require('body-parser');
const UserModel = require("../models/UserModel")
import { UserRepository } from '../models/UserModel';
const service = require('../../services.js');
import { getCustomRepository, getRepository } from 'typeorm';
import { User } from "../entities/Users";
// const service = require('../../services.js');
const bcrypt = require("bcryptjs");
const UserController = {};

// Registro de usuario 
UserController.registerUser = async(req,res) => {
try {
    console.log(`Registrando usuario...`);
    console.log(`Hasheando datos privados...`);
    // Con los datos de la request, hasheado aquellos que sean datos privados
    const user = req.body;
    user.password = await bcrypt.hash(user.password,2);
    user.firstName = await bcrypt.hash(user.firstName,2);
    user.lastName = await bcrypt.hash(user.lastName,2);
    user.email = await bcrypt.hash(user.email,2);
    console.log(`OK`);
    console.log(`Guardando nuevo usuario...`);
    // Guardo los datos en el repositorio de Users
    const savedUser = await new getRepository(User).save(user);
    console.log(`OK - Nuevo usuario: ${savedUser.id}`);
    console.log(`Generando TOKEN de sesión...`);
    // Creo el token para iniciar sesión con el usuario
    const token = service.createToken(savedUser.id, savedUser.rol);
    console.log(`OK - Token: ${token}`);
    // Devuelvo  el id creado y el token
    res.status(201).send({id: savedUser.id, token: token});
   }
    catch(error) {
        console.log(`ERROR: ${error}`);
        res.status(200).send(error);
    }
}

//Modificación de datos de usuario
UserController.updateUser = async(req,res) => {{
    try {
        const userRepository = new getCustomRepository(UserRepository);
        const userUpdated = await userRepository.updateUser(req.params.id, req.body);
        res.json(userUpdated)}
        catch(error) {
            res.send(error);
        }
}
}
// Login
UserController.login = async(req,res) => {
    try {
        // Busco un usuario que coincida con el username que viene en la request
        console.log(`Buscando usuario existente...`);
        const user = await new getRepository(User).findOne({where: {userName: req.body.username}, select: ["id", "userName", "password"], relations: ["rol"]})
        // Chequea que el encuentre un usuario
        if (user === 'undefined' || user.length <= 0) {
            // Si no encuentra => Devuelve error al usuario
            console.log(`ERROR - El usuario no existe`);
            res.status(200).send("Usuario no existe");
        } 
        // Si lo encuentra, compara la contraseña de la request con la guardada
        // Primero hashea la contraseña
        console.log(`OK - Usuario encontrado: ${user.id}`);
        console.log(`Chequeando password...`);
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        // Si devuelve FALSE (no son iguales) => Devuelve error al usuario
        if (!validPassword) {
            console.log(`ERROR - La contraseña es incorrecta`);
            res.status(401).send("La contraseña es incorrecta");
        }
        // Si devuelve TRUE (son iguales) => Crea el TOKEN de la sesión y lo devuelve al usuario
        else {
        console.log(`OK - Password correcto`);
        console.log(`Creando TOKEN...`);
        const token = service.createToken(user.id, user.rol.rolId);
        console.log(`OK - Token ${token}`)
        res.status(200).send({token: token});
        }
    }
        catch(error) {
            console.log(`ERROR: ${error}`);
            res.status(200).send(error);
        }
    }

//User Info
UserController.userInfo = async(req,res) => {
    const userRepository = new getCustomRepository(UserRepository);
    const userInfo = await userRepository.getUserInfo(req.params.id);
    var newUserInfo = [{id: userInfo.id, userName: userInfo.userName, firstName: userInfo.firstName, lastName: userInfo.lastName, email: userInfo.email, rol: userInfo.rol}]
    res.json(userInfo);
  }

module.exports = UserController;