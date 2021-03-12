import { EntityRepository, Repository } from "typeorm";
import { Purchase } from "../entities/Purchase";


@EntityRepository(Purchase)
export class PurchaseRepository extends Repository {

    // Nueva compra
    async newPurchase(purchaseInfo) {
        try {
        const purchase = new Purchase();
        purchase.seller = purchaseInfo.seller;
        purchase.buyer = purchaseInfo.buyer;
        return await this.save(purchase);}
        catch (error) {
            throw error;
        }
    }

    async deletePurchase (id) {
        try {
        await this.delete({purchaseId: id}) 
        }
        catch (error) {
            throw error;
        }
    }

  
}
