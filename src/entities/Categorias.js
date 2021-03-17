import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categorias {
    @PrimaryGeneratedColumn()
    id= undefined;
    @Column("varchar")
    categoryDesc= "";
}