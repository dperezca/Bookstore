import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./Users";
import { ProdOrder } from "./ProdOrder";

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    purchaseId = undefined;
    @ManyToOne(() => User, seller => seller.id)
    seller= User;
    @ManyToOne(() => User, buyer => buyer.id)
    buyer= User;
    // @OneToMany(() => ProdOrder, prodOrder => prodOrder.purchase)
    // prodOrder= ProdOrder;
}