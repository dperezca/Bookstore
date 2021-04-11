import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./Users";
import { ProdOrder } from "./ProdOrder";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id = undefined;
    @ManyToOne(() => User, buyer => buyer.id, {eager: true},{update: false})
    buyer= User;
     @OneToMany(() => ProdOrder, prodOrder => prodOrder.order)
    prodOrder= ProdOrder;
    @Column("varchar")
    address = "";
}
