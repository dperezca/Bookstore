import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    rolId = undefined;
    @Column("varchar")
    rolDesc="";
}