const express = require('express');
const bodyParser = require('body-parser');
import { getCustomRepository } from 'typeorm';
import { PurchaseRepository } from '../models/PurchaseModel';

const PurchaseController = {};

// Creación de un nuevo product
PurchaseController.newPurchase = async(req,res) => {
try {
    const purchaseRepository = new getCustomRepository(PurchaseRepository);
    const purchase = await purchaseRepository.newPurchase(req.body);
    res.json(purchase);
}
    catch(error) {
        return error;
    }
}

module.exports = PurchaseController;