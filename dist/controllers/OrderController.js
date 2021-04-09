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
            var showOrder = await orderRepository.findOne({ id: savedOrder.id }, { relations: ["prodOrder"] });
            console.log(showOrder);
            res.json(showOrder);
        } catch (error) {
            await orderRepository.delete(savedOrder.id);
            res.status(200).json(error);
        }
    }
    // Con el id de la orden, guardo los productos en la tabla de prod_orden

    // await prodOrderRepository.save(prod_order);
    // orderRepository.save(req.body);
    // const purchase = await orderRepository.newPurchase(req.body);
    // // Con el id de la orden, guardo los productos en la tabla de prod_orden
    // try {const prodOrderRepository = new getCustomRepository(ProdOrderRepository);
    // const prodOrder = await prodOrderRepository.newOrderList(purchase.purchaseId, req.body);
    // res.json(req.body)}
    // Si hay errores guardando los productos, me borra la compra y me devuelve error
    catch (error) {
        res.status(200).send(error);
        console.log(error);
        // await orderRepository.deletePurchase(purchase.purchaseId);
        // res.status(200).json(error);
    }
};
// catch(error) {
//     res.status(200).json(error);
// }


// Creación de un nuevo product
OrderController.showOrders = async function (req, res) {
    try {
        var orderRepository = new _typeorm.getRepository(_Orders.Order);
        var allPurchases = await orderRepository.find({ relations: ["prodOrder", "prodOrder.product"] });
        res.json(allPurchases);
    } catch (error) {
        console.log(error);
        res.status(200).send(error);
    }
};
module.exports = OrderController;