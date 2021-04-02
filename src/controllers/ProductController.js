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
            return error;
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
        const productUpdated = await productRepository.updateById(req.params.id, req.body);
        res.json(productUpdated)
    }
        catch(error) {
            return error;
    }
    }


module.exports = ProductController;