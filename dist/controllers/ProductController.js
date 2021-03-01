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

//Buscar por ID
ProductController.findById = async function (req, res) {
    try {
        var productRepository = new _typeorm.getCustomRepository(_ProductModel.ProductRepository);
        var product = await productRepository.findById(req.params.id);
        res.json(product);
    } catch (error) {
        return error;
    }
};

//Buscar por Query
ProductController.findByQuery = async function (req, res) {
    try {
        var productRepository = new _typeorm.getCustomRepository(_ProductModel.ProductRepository);
        if (Object.entries(req.query).length === 0) {
            res.send('No hay criterios de busqueda');
        } else {
            var product = await productRepository.findByQuery(req.query);
            res.json(product);
        }
    } catch (error) {
        return error;
    }
};

module.exports = ProductController;