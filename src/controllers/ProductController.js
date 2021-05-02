const express = require('express');
const bodyParser = require('body-parser');
const ProductModel = require("../models/ProductModel")
import { ProductRepository } from '../models/ProductModel';
import { getCustomRepository } from 'typeorm';
import { getRepository } from 'typeorm';
import { getConnection } from 'typeorm';
import { Product } from "../entities/Products";
import { ProdOrder } from '../entities/ProdOrder';

const ProductController = {};

// Creación de un nuevo product
ProductController.createProduct = async(req,res) => {
try {
    console.log("Creando producto");
    const productRepository = new getCustomRepository(ProductRepository);
    const product = await productRepository.createProduct(req.body, req.user);
    res.status(200).send(product)
}
    catch(error) {
    res.status(201).send(error);
    }
}

//Buscar por ID
ProductController.findById = async(req,res) => {
    try {
        const productRepository = new getCustomRepository(ProductRepository);
        const product = await productRepository.findById(req.params.id);
        res.json(product)
    }
        catch(error) {
            res.status(200).send(error);
        }
    }

 //Buscar por Query
 ProductController.findByQuery = async(req,res) => {
    try {
        const productRepository = new getCustomRepository(ProductRepository);
        if (Object.entries(req.query).length === 0 ) {
            res.send('No hay criterios de busqueda');
        }
        else {
            const product = await productRepository.findByQuery(req.query);
            res.json(product);
        }
     }
        catch(error) {
            return error;
        }
    }

//Mostrar todos
ProductController.findAll = async(req,res) => {
    try {
        const ProductRepository = new getRepository(Product);
        const listaProd = await ProductRepository.find();
        res.send(listaProd);
    } 
    catch (error) {
        res.status(200).send(error);
    }
    }

//Revisar quien es el creador 
ProductController.checkIfCreator = async(req,res,next) => {
    try {
        console.log("Chequeando que el usuario sea el creador o un admin");
        const productRepository = new getCustomRepository(ProductRepository);
        const producto = await productRepository.findById(req.params.id);
        console.log(producto.created.id);
        // Controlo que el creador sea el mismo usuario que el usuario del TOKEN activo
        if (producto.created.id === req.user) {
            next();
            
        } else {
            throw "Solo puede modificar el producto el creador"
        }
    }
        catch(error) {
            res.status(200).send(error);
    }    

}

 //Update by ID
 ProductController.updateById = async(req,res) => {
    try {
        console.log("aca");
        const productRepository = new getCustomRepository(ProductRepository);
        console.log(req.params.id);
        const productoUpdated = await productRepository.updateById(req.params.id,req.body);
        res.send(await productRepository.findById(req.params.id));
        }     
        catch(error) {
            console.log(error);
            res.status(200).send(error);
    }
 }  

 ProductController.delete = async(req,res) => {
    try {
        const ProductRepository = new getRepository(Product);
        await ProductRepository.delete(req.params.id);
        res.send("Producto Eliminado");
    } 
    catch (error) {
        res.status(200).send(error);
    }
}

ProductController.bestSellers = async(req,res) => {
    try {
        console.log(`Buscando 10 productos más vendidos`);
        // Sumo las cantidades de las ordenes y devuelvo 10 productos mas vendidos y cantidad vendida
        const prod_orders  = await getRepository(ProdOrder)
        .createQueryBuilder("prod_order")
        .select("prod_order.product")
        .addSelect("SUM(prod_order.quantity)", "sum")
        .groupBy("prod_order.product")
        .limit(10)
        .orderBy("SUM(prod_order.quantity)","DESC")
        .getRawMany();
        // Creo un array y por cada producto encuentro los datos y le agrego la cantidad vendida
        const bestSellers = [];
        for (var i = 0; i<prod_orders.length; i++) {
            const id = prod_orders[i].productId;
            const prod =  await getRepository(Product).findOne({where: {id: prod_orders[i].productId}, relations: ["idioma", "estado", "category"]});
           prod.quantity= prod_orders[i].sum;
            bestSellers.push(prod);
        }
        // Devuelvo el nuevo array
        console.log(`OK - Productos encontrados`,bestSellers);
        await res.status(200).send(bestSellers);
    } 
    catch (error) {
        console.log(`ERROR`,error);
        res.status(200).send(error);
    }
}


module.exports = ProductController;