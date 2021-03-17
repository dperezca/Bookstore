import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Idiomas {
    @PrimaryColumn("varchar", { unique: true})
    cod = undefined;
    @Column("varchar")
    idiomaDesc="";
}