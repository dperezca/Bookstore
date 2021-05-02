import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities/Products";
import { Like } from 'typeorm';
import {LessThanOrEqual, MoreThanOrEqual, Between} from "typeorm";


@EntityRepository(Product)
export class ProductRepository extends Repository {
    async createProduct(product, user) {
        try {
        // Crea el producto
        const newProduct = new Product();
        product.created = user;
        return await this.save(product);
    }
        catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
        const product = await this.findOne({id: id}, {relations: ["category", "idioma", "estado"]});
      if (product === undefined || product.length <=0) {
            throw "El producto no existe";
        } else {
            return product;
        }
       
    }
        catch (error) {
            throw error;
        }
    }

    async findByQuery(query) {
        try {
             if (Object.getOwnPropertyNames(query).includes("pricemin") && Object.getOwnPropertyNames(query).includes("pricemax")) {
                 query.price = Between(query.pricemin,query.pricemax);
                 delete query.pricemin;
                 delete query.pricemax
             }
             else if (Object.getOwnPropertyNames(query).includes("pricemin")) {
                query.price = MoreThanOrEqual(query.pricemin).LessThanOrEqual(25);
                delete query.pricemin;
            } else if (Object.getOwnPropertyNames(query).includes("pricemax")) {
                console.log("maximo");
                query.price = LessThanOrEqual(query.pricemax);
                delete query.pricemin;
            }
            var listProd =  await this.find({
                where: [
              query
                ]
              });            
            if (listProd.length === 0) {
                return ("No se encontraton coincidencias");
            } else {
                return listProd;
            }}
        
        catch (error) {
            return error;
        }
    }

    async updateById(id, newProductInfo) {
        try {
            console.log("Actualizando producto");
            return await this.update(id, newProductInfo);
        }
    catch(error) {
        return error;
    }

}

}
