import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./Users";
import { ProdOrder } from "./ProdOrder";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id = undefined;
    @ManyToOne(() => User, buyer => buyer.id, {eager: true})
    buyer= User;
     @OneToMany(() => ProdOrder, prodOrder => prodOrder.order)
    prodOrder= ProdOrder;
}
