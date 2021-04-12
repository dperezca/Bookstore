'use strict';

var _ProductModel = require('../models/ProductModel');

var _typeorm = require('typeorm');

var _Products = require('../entities/Products');

var _ProdOrder = require('../entities/ProdOrder');

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

//Mostrar todos
ProductController.findAll = async function (req, res) {
    try {
        var _ProductRepository = new _typeorm.getRepository(_Products.Product);
        var listaProd = await _ProductRepository.find();
        res.send(listaProd);
    } catch (error) {
        res.status(200).send(error);
    }
};

//Revisar quien es el creador 
ProductController.checkIfCreator = async function (req, res, next) {
    try {
        var productRepository = new _typeorm.getCustomRepository(_ProductModel.ProductRepository);
        var producto = await productRepository.findById(req.params.id);
        // Controlo que el creador sea el mismo usuario que el usuario del TOKEN activo
        if (producto.created.id === req.user) {
            next();
        } else {
            throw "Solo puede modificar el producto el creador";
        }
    } catch (error) {
        res.status(200).send(error);
    }
};

//Update by ID
ProductController.updateById = async function (req, res) {
    try {
        var productRepository = new _typeorm.getCustomRepository(_ProductModel.ProductRepository);
        var productoUpdated = await productRepository.updateById(req.params.id, req.body);
        res.send((await productRepository.findById(req.params.id)));
    } catch (error) {
        res.status(200).send(error);
    }
};

ProductController.delete = async function (req, res) {
    try {
        var _ProductRepository2 = new _typeorm.getRepository(_Products.Product);
        await _ProductRepository2.delete(req.params.id);
        res.send("Producto Eliminado");
    } catch (error) {
        res.status(200).send(error);
    }
};

ProductController.bestSellers = async function (req, res) {
    try {
        console.log('Buscando 10 productos m\xE1s vendidos');
        // Sumo las cantidades de las ordenes y devuelvo 10 productos mas vendidos y cantidad vendida
        var prod_orders = await (0, _typeorm.getRepository)(_ProdOrder.ProdOrder).createQueryBuilder("prod_order").select("prod_order.product").addSelect("SUM(prod_order.quantity)", "sum").groupBy("prod_order.product").limit(10).orderBy("SUM(prod_order.quantity)", "DESC").getRawMany();
        // Creo un array y por cada producto encuentro los datos y le agrego la cantidad vendida
        var bestSellers = [];
        for (var i = 0; i < prod_orders.length; i++) {
            var id = prod_orders[i].productId;
            var prod = await (0, _typeorm.getRepository)(_Products.Product).findOne({ where: { id: prod_orders[i].productId }, relations: ["idioma", "estado", "category"] });
            prod.quantity = prod_orders[i].sum;
            bestSellers.push(prod);
        }
        // Devuelvo el nuevo array
        console.log('OK - Productos encontrados', bestSellers);
        await res.status(200).send(bestSellers);
    } catch (error) {
        console.log('ERROR', error);
        res.status(200).send(error);
    }
};

module.exports = ProductController;