import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    prodId = undefined;
    @Column("integer")
    seller="";
    @Column("integer")
    category="";
    @Column("varchar")
    title="";
    @Column("varchar")
    author="";
    @Column("varchar", { nullable: true })
    ISBN= "";
    @Column("integer")
    idioma="";
    @Column("integer")
    estado="";
}