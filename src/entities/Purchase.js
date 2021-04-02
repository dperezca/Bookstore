import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./Users";
import { ProdOrder } from "./ProdOrder";
import PurchaseRouter from "../routes/ProductRouter";

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    purchaseId = undefined;
    @ManyToOne(() => User, seller => seller.id, {eager: true})
    created= User;
    @ManyToOne(() => User, buyer => buyer.id, {eager: true})
    buyer= User;
     @OneToMany(() => ProdOrder, prodOrder => prodOrder.purchase)
   prodOrder= ProdOrder;
}
