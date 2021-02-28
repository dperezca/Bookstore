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

module.exports = ProductController;