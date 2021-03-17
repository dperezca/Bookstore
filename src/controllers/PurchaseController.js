const express = require('express');
const bodyParser = require('body-parser');
import { getCustomRepository } from 'typeorm';
import { PurchaseRepository } from '../models/PurchaseModel';
import { ProdOrderRepository } from '../models/ProdOrder';

const PurchaseController = {};

// Creación de un nuevo product
PurchaseController.newPurchase = async(req,res) => {
    try {
        // Genero una nueva orden
        const purchaseRepository = new getCustomRepository(PurchaseRepository);
        const purchase = await purchaseRepository.newPurchase(req.body);
        // Con el id de la orden, guardo los productos en la tabla de prod_orden
        try {const prodOrderRepository = new getCustomRepository(ProdOrderRepository);
        const prodOrder = await prodOrderRepository.newOrderList(purchase.purchaseId, req.body);
        res.json(req.body)}
        // Si hay errores guardando los productos, me borra la compra y me devuelve error
        catch(error) {
            await purchaseRepository.deletePurchase(purchase.purchaseId);
            res.status(200).json(error);
        }
    }
        catch(error) {
            res.status(200).json(error);
        }
    }

    // Creación de un nuevo product
PurchaseController.showPurchases = async(req,res) => {
    try {
        const purchaseRepository = new getCustomRepository(PurchaseRepository);
        const allPurchases = await purchaseRepository.findAll();
        console.log(allPurchases);
        res.json(allPurchases);
    }
        catch(error) {
            res.status(200).json(error);
        }
    }
module.exports = PurchaseController;