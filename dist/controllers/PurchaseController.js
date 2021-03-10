'use strict';

var _typeorm = require('typeorm');

var _PurchaseModel = require('../models/PurchaseModel');

var express = require('express');
var bodyParser = require('body-parser');


var PurchaseController = {};

// Creación de un nuevo product
PurchaseController.newPurchase = async function (req, res) {
    try {
        var purchaseRepository = new _typeorm.getCustomRepository(_PurchaseModel.PurchaseRepository);
        var purchase = await purchaseRepository.newPurchase(req.body);
        res.json(purchase);
    } catch (error) {
        return error;
    }
};

module.exports = PurchaseController;