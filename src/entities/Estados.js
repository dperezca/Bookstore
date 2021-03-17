import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Estados {
    @PrimaryGeneratedColumn()
    id= undefined;
    @Column("varchar")
    estadoDesc="";
}