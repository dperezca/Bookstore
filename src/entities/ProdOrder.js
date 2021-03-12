import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Product } from "./Products";
import {Purchase} from "./Purchase";

@Entity()
export class ProdOrder {
    @PrimaryGeneratedColumn()
    prodOrderId = undefined;
    @ManyToOne(() => Product, product => product.prodId)
    product= Product;
    @ManyToOne(() => Purchase, purchase => purchase.purchaseId)
    purchase= Purchase;
    @Column("integer")
    amount="";
}