const express = require('express');
const bodyParser = require('body-parser');
import { getCustomRepository } from 'typeorm';
import { getRepository } from 'typeorm';
import { Order } from "../entities/Orders";
import { ProdOrder } from "../entities/ProdOrder";

const OrderController = {};

// Creación de un nuevo product
OrderController.newOrder = async(req,res) => {
    try {
        // Genero una nueva orden
        const orderRepository = new getRepository(Order);
        const newOrder = new Order();
        //Agrego el id del usuario activo en TOKEN como buyer de la orden
        req.body.buyer = req.user;
        const savedOrder = await orderRepository.save(req.body);
        console.log(`OK - Orden ${savedOrder.id} generada - Guardando productos de la orden...`)
        // Genero la instancia de prod_order
        try {
        const prodOrderRepository = new getRepository(ProdOrder);
        const prod_order = new ProdOrder();
        // Genero una nueva instancia y guardo por cada producto de la orden
        for (var i = 0; i< req.body.products.length;i++) {
            const prod_order = new ProdOrder();
            prod_order.order= savedOrder.id;
            prod_order.product = req.body.products[i].id;
            prod_order.amount= req.body.products[i].amount;
            await prodOrderRepository.save(prod_order);
        }
        // Busco la orden guardada y la devuelvo en la response
        console.log(`OK - Productos guardados`)
        const showOrder = await orderRepository.findOne({id: savedOrder.id}, {relations: ["prodOrder","prodOrder.product"]});
        res.json(showOrder);
    }
    catch (error) {
        // Si no puedo guardar algun producto, devuelvo error y elimino la orden guardada
        console.log(`ERROR - No se pudieron guardar los productos: ${error}`);
        await orderRepository.delete(savedOrder.id);
        res.status(200).send(error);
    }
    }
        catch(error) {
            console.log(`ERROR - No se pudieron generar la orden: ${error}`);
            res.status(200).send(error);
        }
    }

    //  Mostrar todos los productos
    OrderController.showOrders = async(req,res) => {
    try {
        const orderRepository = new getRepository(Order);
        const allOrders = await orderRepository.find(
            {relations: ["buyer","prodOrder","prodOrder.product"]})
        res.json(allOrders);
    }
        catch(error) {
            res.status(200).send(error);
        }
    }
 
    //Muestra compras hechas por el usuario que viene en el parametro
    OrderController.showOrdersUser = async(req,res,next) => {
        try {
        const orderRepository = new getRepository(Order);
        const orders = await orderRepository.find({
            where: {buyer: req.params.id},
            relations: ["prodOrder","prodOrder.product"]});
        res.status(200).json(orders);}
        catch (error) {
            res.status(200).send(error);
        }
    }

        //Actualiza la orden
        //Los productos no se pueden actualizar 
        OrderController.updateOrder = async(req,res,next) => {
            try {           
            console.log(`Actualizando orden numero ${req.params.order}`);
            const orderRepository = new getRepository(Order);
            const newOrder = await orderRepository.update(req.params.order,req.body);
            console.log(`OK - Orden actualizada`);;
            const orderUpdated = await orderRepository.findOne({id: req.params.order},{relations: ["prodOrder","prodOrder.product"]});
            res.status(200).json(orderUpdated);}
            catch (error) {
                console.log(error);
                res.status(200).send(error);
            }
        }


            OrderController.checkIfBuyer = async(req,res,next) => {
                try {
                    const orderRepository = new getRepository(Order);
                    const order = await orderRepository.findOne({id: req.params.order});
                    // Controlo que el comprador sea el mismo usuario que el usuario del TOKEN activo
                    console.log("ID Usuario: ",req.user," Buyer: ",order.buyer.id);
                    if (order.buyer.id == req.user || req.rol === 1) {
                        console.log("OK - Usuario activo es el comprador o admin")
                        next();
                    } else {
                        console.log("ERROR - Usuario distinto al comprador")
                        throw "Solo puede modificar el producto el comprador o un administrador"
                    }
                }
                    catch(error) {
                        res.status(200).send(error);
                }    
            
            }
        

module.exports = OrderController;