'use strict';

var _typeorm = require('typeorm');

var _PurchaseModel = require('../models/PurchaseModel');

var _ProdOrder = require('../models/ProdOrder');

var _Orders = require('../entities/Orders');

var _ProdOrder2 = require('../entities/ProdOrder');

var express = require('express');
var bodyParser = require('body-parser');


var OrderController = {};

// Creación de un nuevo product
OrderController.newOrder = async function (req, res) {
    try {
        // Genero una nueva orden
        var orderRepository = new _typeorm.getRepository(_Orders.Order);
        var order = new _Orders.Order();
        order.buyer = req.user;
        order.prodOrder = [];
        var savedOrder = await orderRepository.save(order);
        // Genero la instancia de prod_order
        try {
            var prodOrderRepository = new _typeorm.getRepository(_ProdOrder2.ProdOrder);
            var prod_order = new _ProdOrder2.ProdOrder();
            for (var i = 0; i < req.body.products.length; i++) {
                var _prod_order = new _ProdOrder2.ProdOrder();
                _prod_order.order = savedOrder.id;
                _prod_order.product = req.body.products[i].id;
                _prod_order.amount = req.body.products[i].amount;
                await prodOrderRepository.save(_prod_order);
            }
            var showOrder = await orderRepository.findOne({ id: savedOrder.id }, { relations: ["prodOrder", "prodOrder.product"] });
            console.log(showOrder);
            res.json(showOrder);
        } catch (error) {
            await orderRepository.delete(savedOrder.id);
            res.status(200).json(error);
        }
    } catch (error) {
        res.status(200).send(error);
    }
};

//  Mostrar todos los productos
OrderController.showOrders = async function (req, res) {
    try {
        var orderRepository = new _typeorm.getRepository(_Orders.Order);
        var allOrders = await orderRepository.find({ relations: ["buyer", "prodOrder", "prodOrder.product"] });
        res.json(allOrders);
    } catch (error) {
        res.status(200).send(error);
    }
};

//Muestra compras hechas por el usuario que viene en el parametro
OrderController.showOrdersUser = async function (req, res, next) {
    try {
        var orderRepository = new _typeorm.getRepository(_Orders.Order);
        var orders = await orderRepository.find({ buyer: req.params.id }, { relations: ["prodOrder", "prodOrder.product"] });
        res.status(200).json(orders);
    } catch (error) {
        res.status(200).send(error);
    }
};

//Actualiza la orden
//Los productos no se pueden actualizar 
OrderController.updateOrder = async function (req, res, next) {
    try {
        console.log('Actualizando orden numero ' + req.params.order);
        var orderRepository = new _typeorm.getRepository(_Orders.Order);
        var newOrder = await orderRepository.update(req.params.order, req.body);
        console.log('OK - Orden actualizada');
        console.log('Buscando info actualizada de orden ' + req.params.order);
        var orderUpdated = await orderRepository.findOne({ id: req.params.order }, { relations: ["prodOrder", "prodOrder.product"] });
        res.status(200).json(orderUpdated);
    } catch (error) {
        console.log(error);
        res.status(200).send(error);
    }
};

OrderController.checkIfBuyer = async function (req, res, next) {
    try {
        var orderRepository = new _typeorm.getRepository(_Orders.Order);
        var order = await orderRepository.findOne({ id: req.params.order });
        // Controlo que el comprador sea el mismo usuario que el usuario del TOKEN activo
        console.log("ID Usuario: ", req.user, " Buyer: ", order.buyer.id);
        if (order.buyer.id == req.user || req.rol === 1) {
            console.log("OK - Usuario activo es el comprador o admin");
            next();
        } else {
            console.log("ERROR - Usuario distinto al comprador");
            throw "Solo puede modificar el producto el comprador o un administrador";
        }
    } catch (error) {
        res.status(200).send(error);
    }
};

module.exports = OrderController;