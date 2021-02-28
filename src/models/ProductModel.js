import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities/Products";


@EntityRepository(Product)
export class ProductRepository extends Repository {

    // Registro de usuario con los datos del JSON
    async createProduct(product) {
        try {
        // Crea el usuario
        const newProduct = new Product();
        console.log(newProduct);
        console.log(product);
        newProduct.seller = product.seller;
        console.log(newProduct);
        newProduct.category = product.category;
        newProduct.title = product.title;
        newProduct.author = product.author;
        newProduct.ISBN = product.ISBN;
        newProduct.idioma = product.idioma;
        newProduct.estado = product.estado;
        console.log(newProduct);
            return await this.save(newProduct);
    }
        catch (error) {
            return error;
        }
    }

}
