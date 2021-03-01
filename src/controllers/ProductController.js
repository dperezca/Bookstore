const express = require('express');
const bodyParser = require('body-parser');
const ProductModel = require("../models/ProductModel")
import { ProductRepository } from '../models/ProductModel';
import { getCustomRepository } from 'typeorm';

const ProductController = {};

// Creación de un nuevo product
ProductController.createProduct = async(req,res) => {
try {
    const productRepository = new getCustomRepository(ProductRepository);
    const product = await productRepository.createProduct(req.body);
    res.json(product)
}
    catch(error) {
        return error;
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


module.exports = ProductController;