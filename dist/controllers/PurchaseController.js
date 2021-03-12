'use strict';

var _typeorm = require('typeorm');

var _PurchaseModel = require('../models/PurchaseModel');

var _ProdOrder = require('../models/ProdOrder');

var express = require('express');
var bodyParser = require('body-parser');


var PurchaseController = {};

// Creación de un nuevo product
PurchaseController.newPurchase = async function (req, res) {
    try {
        var purchaseRepository = new _typeorm.getCustomRepository(_PurchaseModel.PurchaseRepository);
        var purchase = await purchaseRepository.newPurchase(req.body);
        try {
            var prodOrderRepository = new _typeorm.getCustomRepository(_ProdOrder.ProdOrderRepository);
            var prodOrder = await prodOrderRepository.newOrderList(purchase.purchaseId, req.body);
            res.json(req.body);
        } catch (error) {
            await purchaseRepository.deletePurchase(purchase.purchaseId);
            res.status(200).json(error);
        }
    } catch (error) {
        res.status(200).json(error);
    }
};

module.exports = PurchaseController;