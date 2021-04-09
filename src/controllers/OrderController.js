const express = require('express');
const bodyParser = require('body-parser');
import { getCustomRepository } from 'typeorm';
import { PurchaseRepository } from '../models/PurchaseModel';
import { ProdOrderRepository } from '../models/ProdOrder';
import { getRepository } from 'typeorm';
import { Order } from "../entities/Orders";
import { ProdOrder } from "../entities/ProdOrder";

const OrderController = {};

// Creación de un nuevo product
OrderController.newOrder = async(req,res) => {
    try {
        // Genero una nueva orden
        const orderRepository = new getRepository(Order);
        var order = new Order();
        order.buyer = req.user;
        order.prodOrder = [];
        const savedOrder = await orderRepository.save(order);
        // Genero la instancia de prod_order
        try {
        const prodOrderRepository = new getRepository(ProdOrder);
        const prod_order = new ProdOrder();
        for (var i = 0; i< req.body.products.length;i++) {
            const prod_order = new ProdOrder();
            prod_order.order= savedOrder.id;
            prod_order.product = req.body.products[i].id;
            prod_order.amount= req.body.products[i].amount;
            await prodOrderRepository.save(prod_order);
        }
        const showOrder = await orderRepository.findOne({id: savedOrder.id}, {relations: ["prodOrder"]});
        console.log(showOrder);
        res.json(showOrder);
    }
    catch (error) {
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
        catch(error) {
            res.status(200).send(error);
            console.log(error);
            // await orderRepository.deletePurchase(purchase.purchaseId);
            // res.status(200).json(error);
        }
    }
        // catch(error) {
        //     res.status(200).json(error);
        // }
    

    // Creación de un nuevo product
    OrderController.showOrders = async(req,res) => {
    try {
        const orderRepository = new getRepository(Order);
        const allPurchases = await orderRepository.find({relations: ["prodOrder","prodOrder.product"]});
        res.json(allPurchases);
    }
        catch(error) {
            console.log(error);
            res.status(200).send(error);
        }
    }
module.exports = OrderController;