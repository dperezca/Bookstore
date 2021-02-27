import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id = undefined;
    @Column("varchar")
    password="";
    @Column("varchar", { unique: true})
    userName="";
    @Column("varchar")
    firstName="";
    @Column("varchar")
    lastName="";
    @Column("varchar")
    email="";
    @Column("integer")
    rol="";
}