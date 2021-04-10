import { EntityRepository, getConnection, Repository } from "typeorm";
import { Purchase } from "../entities/Orders";
import {getRepository} from "typeorm";
import { UserRepository } from "./UserModel";
import { User } from "../entities/Users";


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

    async findAll () {
        try {
        const list = await this.find({relations: ["buyer", "prodOrder"]}) ;
        // const newList = [];
        // console.log(list[0].seller.id);
        // for (var i = 0; i<list.length - 1; i++) {
        //     newList.push(
        //         {"purchaseId": list[i].purchaseId,
        //         "seller": {"id": list[i].seller.id,"username": list[i].seller.userName},
        //         "buyer": {"id": list[i].seller.id,"username": list[i].seller.userName}},
        //         "prodOrder": {"id": list[i].seller.id,"username": list[i].seller.userName}},
        //         );
        
        return list;
        }
        catch (error) {
            return error;
        }
    }

}
