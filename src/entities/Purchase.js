import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./Users";

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    purchaseId = undefined;
    @ManyToOne(() => User, seller => seller.id)
    seller= User;
    @ManyToOne(() => User, buyer => buyer.id)
    buyer= User;
}