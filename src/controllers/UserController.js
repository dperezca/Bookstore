const express = require('express');
const bodyParser = require('body-parser');
const service = require('../../services.js');
import { getRepository } from 'typeorm';
import { User } from "../entities/Users";
const bcrypt = require("bcryptjs");
const UserController = {};

// Registro de usuario 
UserController.registerUser = async(req,res) => {
try {
    console.log(`Registrando usuario...`);
    console.log(`Hasheando password...`);
    // Con los datos de la request, hasheo el passwords
    const user = req.body;
    user.password = await bcrypt.hash(user.password,2);
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
UserController.updateUser = async(req,res) => {
    try {
        // Busco un usuario que coincida con el id que viene en la request
        console.log(`Buscando usuario existente...`);
        const user = await new getRepository(User).findOne({where: {id: req.params.id}, select: ["id", "userName"], relations: ["rol"]})
        // Chequea que el encuentre un usuario
        if (user === undefined) {
            // Si no encuentra => Devuelve error al usuario
            console.log(`ERROR - El usuario no existe`);
            res.status(200).send("Usuario no existe");
        } 
        else {
            console.log("hay usuairo");
            const userRepository = new getRepository(User);
            // Si lo que modifica es la password, la hashea
            if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password,2);} 
            await userRepository.update(req.params.id, req.body);
            const user = await userRepository.findOne({where: {id: req.params.id}, select: ["id", "userName", "firstName", "lastName","email"], relations: ["rol"]})
            res.status(200).send(user);
        }
}
        catch(error) {
            res.status(200).send(error);
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
    try {
        // Busco un usuario que coincida con el id que viene en la request
        console.log(`Buscando usuario existente...`);
        const user = await new getRepository(User).findOne({where: {id: req.params.id}, select: ["id", "userName", "password"], relations: ["rol"]})
        // Chequea que el encuentre un usuario
        if (user === undefined) {
            // Si no encuentra => Devuelve error al usuario
            console.log(`ERROR - El usuario no existe`);
            res.status(200).send("Usuario no existe");
        } 
        else {
            res.status(200).send(user);
        }
}
    catch (error) {
        res.status(200).send(error);
    }
  }

module.exports = UserController;