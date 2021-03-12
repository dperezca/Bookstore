import { EntityRepository, Repository } from "typeorm";
import { ProdOrder } from "../entities/ProdOrder";
import { Product } from "../entities/Products";


@EntityRepository(ProdOrder)
export class ProdOrderRepository extends Repository {

    // Nueva lista de productos
    async newOrderList(id, products) {
        try {
        for (var i = 0; i< products.products.length;i++) {
        const prodOrder = new ProdOrder();
        prodOrder.purchase= id;
        prodOrder.product = products.products[i].id;
        prodOrder.amount= products.products[i].amount;
        await this.save(prodOrder);
        }
    }
        catch (error) {
        throw error;
        }
    }

  
}
