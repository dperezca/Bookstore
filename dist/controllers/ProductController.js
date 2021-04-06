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
        console.log("Creando producto");
        var productRepository = new _typeorm.getCustomRepository(_ProductModel.ProductRepository);
        var product = await productRepository.createProduct(req.body, req.user);
        res.status(200).send(product);
    } catch (error) {
        res.status(201).send(error);
    }
};

//Buscar por ID
ProductController.findById = async function (req, res) {
    try {
        var productRepository = new _typeorm.getCustomRepository(_ProductModel.ProductRepository);
        var product = await productRepository.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(200).send(error);
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

//Update by ID
ProductController.updateById = async function (req, res) {
    try {
        var productRepository = new _typeorm.getCustomRepository(_ProductModel.ProductRepository);
        var producto = await productRepository.findById(req.params.id);
        // Controlo que el creador sea el mismo usuario que el usuario del TOKEN activo
        if (producto.created.id === req.user) {
            console.log("Usuario activo es el creador del producto");
            var productoUpdated = await productRepository.updateById(req.params.id, req.body);

            res.send((await productRepository.findById(req.params.id)));
        } else {
            throw "Solo puede modificar el producto el creador";
        }
    } catch (error) {
        res.status(200).send(error);
    }
};

module.exports = ProductController;