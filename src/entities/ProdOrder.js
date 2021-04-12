import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Product } from "./Products";
import {Order} from "./Orders";

@Entity()
export class ProdOrder {
    @PrimaryGeneratedColumn()
    id = undefined;
    @ManyToOne(() => Order, order => order.prodOrder)
    order= Order;
    @ManyToOne(() => Product, product => product.prodOrder, {eager: true})
    product= Product;
    @Column("integer")
    quantity="";
}