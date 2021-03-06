import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Rol } from "./Roles";

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
    @ManyToOne(() => Rol, rol => rol.rolId)
    rol= Rol;
}