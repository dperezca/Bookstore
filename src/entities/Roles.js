import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {User} from "./Users";

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    rolId = undefined;
    @Column("varchar")
    rolDesc="";
}