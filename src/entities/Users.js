import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Rol } from "./Roles";
import { Purchase } from "./Orders";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id = undefined;
    @Column("varchar", { select: false })
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
    //@OneToMany(() => Purchase, purchase => purchase.seller)
    // purchase= Purchase;
}