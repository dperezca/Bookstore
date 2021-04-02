import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import {ProdOrder} from './ProdOrder'
import {Categorias} from './Categorias'
import {Idiomas} from './Idiomas'
import {Estados} from './Estados'
import {User} from './Users'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    prodId = undefined;
    @ManyToOne(() => User, seller => seller.id, {eager: true})
    created= User;
    @ManyToOne(() => Categorias, categoria => categoria.id, {nullable: false})
    categoria= Categorias;
    @Column("varchar", {nullable: false})
    title="";
    @Column("varchar", {nullable: false})
    author="";
    @Column("varchar", { nullable: true })
    ISBN= "";
    @ManyToOne(() => Idiomas, idioma => idioma.cod, {nullable: false})
    idioma= Idiomas;
    @ManyToOne(() => Estados, estado => estado.estadoId, {nullable: false})
    estado= Estados;
    @Column("float", {nullable: false})
    price="";
   @OneToMany(() => ProdOrder, prodOrder => prodOrder.product)
    prodOrder= ProdOrder;

}