'use strict';

var _typeorm = require('typeorm');

var _Orders = require('../entities/Orders');

var _ProdOrder = require('../entities/ProdOrder');

var express = require('express');
var bodyParser = require('body-parser');


var OrderController = {};

// Creación de una nueva orden
OrderController.newOrder = async function (req, res) {
    try {
        // Genero una nueva orden
        var orderRepository = new _typeorm.getRepository(_Orders.Order);
        var newOrder = new _Orders.Order();
        //Agrego el id del usuario activo en TOKEN como buyer de la orden
        req.body.buyer = req.user;
        var savedOrder = await orderRepository.save(req.body);
        console.log('OK - Orden ' + savedOrder.id + ' generada - Guardando productos de la orden...');
        // Genero la instancia de prod_order
        try {
            var prodOrderRepository = new _typeorm.getRepository(_ProdOrder.ProdOrder);
            var prod_order = new _ProdOrder.ProdOrder();
            // Genero una nueva instancia y guardo por cada producto de la orden
            for (var i = 0; i < req.body.products.length; i++) {
                var _prod_order = new _ProdOrder.ProdOrder();
                _prod_order.order = savedOrder.id;
                _prod_order.product = req.body.products[i].id;
                _prod_order.quantity = req.body.products[i].quantity;
                await prodOrderRepository.save(_prod_order);
            }
            // Busco la orden guardada y la devuelvo en la response
            console.log('OK - Productos guardados');
            var showOrder = await orderRepository.findOne({ id: savedOrder.id }, { relations: ["prodOrder", "prodOrder.product"] });
            res.json(showOrder);
        } catch (error) {
            // Si no puedo guardar algun producto, devuelvo error y elimino la orden guardada
            console.log('ERROR - No se pudieron guardar los productos: ' + error);
            await orderRepository.delete(savedOrder.id);
            res.status(200).send(error);
        }
    } catch (error) {
        console.log('ERROR - No se pudieron generar la orden: ' + error);
        res.status(200).send(error);
    }
};

//  Mostrar todas las ordenes
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
        var orders = await orderRepository.find({
            where: { buyer: req.params.id },
            relations: ["prodOrder", "prodOrder.product"] });
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
        console.log('OK - Orden actualizada');;
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