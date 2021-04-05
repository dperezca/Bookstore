const express = require('express');
const bodyParser = require('body-parser');
const ProductModel = require("../models/ProductModel")
import { ProductRepository } from '../models/ProductModel';
import { getCustomRepository } from 'typeorm';

const ProductController = {};

// Creación de un nuevo product
ProductController.createProduct = async(req,res) => {
try {
    console.log("Creando producto");
    const productRepository = new getCustomRepository(ProductRepository);
    const product = await productRepository.createProduct(req.body, req.user);
    res.status(200).send(product)
}
    catch(error) {
    res.status(201).send(error);
    }
}

//Buscar por ID
ProductController.findById = async(req,res) => {
    try {
        const productRepository = new getCustomRepository(ProductRepository);
        const product = await productRepository.findById(req.params.id);
        res.json(product)
    }
        catch(error) {
            res.status(200).send(error);
        }
    }

 //Buscar por Query
 ProductController.findByQuery = async(req,res) => {
    try {
        const productRepository = new getCustomRepository(ProductRepository);
        if (Object.entries(req.query).length === 0 ) {
            res.send('No hay criterios de busqueda');
        }
        else {
            const product = await productRepository.findByQuery(req.query);
            res.json(product);
        }
     }
        catch(error) {
            return error;
        }
    }

 //Update by ID
 ProductController.updateById = async(req,res) => {
    try {
        const productRepository = new getCustomRepository(ProductRepository);
        const producto = await productRepository.findById(req.params.id);
        // Controlo que el creador sea el mismo usuario que el usuario del TOKEN activo
        if (producto.created.id === req.user) {
            console.log("update");
        } else {
            throw "Solo puede modificar el producto el creador"
        };
        console.log("created",producto.created.id);
        console.log("usuario",req.user);
       // const productUpdated = await productRepository.updateById(req.params.id, req.body);
        // console.log("aca 2");
        // res.send(productUpdated);
        res.json("too ok");    }
        catch(error) {
            console.log("aca 4");
            res.status(200).send(error);
    }
}


module.exports = ProductController;