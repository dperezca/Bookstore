import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities/Products";
import { Like } from 'typeorm';


@EntityRepository(Product)
export class ProductRepository extends Repository {

    // Registro de usuario con los datos del JSON
    async createProduct(product) {
        try {
        // Crea el usuario
        const newProduct = new Product();
        newProduct.seller = product.seller;
        newProduct.categoria = product.category;
        newProduct.title = product.title;
        newProduct.author = product.author;
        newProduct.ISBN = product.ISBN;
        newProduct.idioma = product.idioma;
        newProduct.estado = product.estado;
        newProduct.price = product.price;
        newProduct.prodOrder = [];
            return await this.save(newProduct);
    }
        catch (error) {
            console.log(error);
            return error;
        }
    }

    async findById(id) {
        try {
        const product = await this.find({prodId: id});
        if (product === undefined || product.length <=0) {
            return "El producto no existe";
        } else {
            return product;
        }
       
    }
        catch (error) {
            return error;
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
            console.log(product);
            product.seller = newProductInfo.seller;
            product.categoria = newProductInfo.category;
            product.title = newProductInfo.title;
            product.author = newProductInfo.author;
            product.ISBN = newProductInfo.ISBN;
            product.idioma = newProductInfo.idioma;
            product.estado = newProductInfo.estado;
            product.price = newProductInfo.price;
            await this.update(id, product);
            return product;
        }
    }
    catch(error) {
        return error;
    }

}

}
