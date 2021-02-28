'use strict';

var _ProductModel = require('../models/ProductModel');

var _typeorm = require('typeorm');

var express = require('express');
var bodyParser = require('body-parser');
var ProductModel = require("../models/ProductModel");


var ProductController = {};

// Creación de un nuevo product
ProductController.createProduct = async function (req, res) {
    try {
        var productRepository = new _typeorm.getCustomRepository(_ProductModel.ProductRepository);
        var product = await productRepository.createProduct(req.body);
        res.json(product);
    } catch (error) {
        return error;
    }
};

module.exports = ProductController;