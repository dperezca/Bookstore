import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities/Products";
import { Like } from 'typeorm';


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
        const product = await this.findOne({prodId: id});
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
            const criterio = (Object.getOwnPropertyNames(query))[0];
            var listProd;
            switch (criterio) {
                case "author":
                listProd = await this.find({author: Like(`%${query.author}%`)});
                case 'title':
                listProd = await this.find({title: Like(`%${query.title}%`)});
                case 'seller':
                listProd = await this.find({seller: Like(`%${query.seller}%`)});
                case 'category':
                listProd = await this.find({categoria: Like(`%${query.category}%`)});
                case 'isbn':
                listProd = await this.find({isbn: Like(`%${query.isbn}%`)});
                case 'estado':
                listProd = await this.find({estado: Like(`%${query.estado}%`)});
                case 'idioma':
                listProd = await this.find({idioma: Like(`%${query.idioma}%`)});
            }
            if (listProd.length === 0) {
                return ("No se encontraton coincidencias");
            } else {
                return listProd;
            }
            }
        catch (error) {
            return error;
        }
    }

    async updateById(id, newProductInfo) {
        try {
        var product = await this.findOne({prodId: id});
        if (product === undefined || product.length <=0) {
            return "El producto no existe";
        } else {
            await this.update(id, newProductInfo);
            return product;
        }
    }
    catch(error) {
        return error;
    }

}

}
