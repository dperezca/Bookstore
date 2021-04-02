import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import {ProdOrder} from './ProdOrder'
import {Categorias} from './Categorias'
import {Idiomas} from './Idiomas'
import {Estados} from './Estados'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    prodId = undefined;
    @Column("integer")
    seller="";
    @ManyToOne(() => Categorias, categoria => categoria.id)
    categoria= Categorias;
    @Column("varchar")
    title="";
    @Column("varchar")
    author="";
    @Column("varchar", { nullable: true })
    ISBN= "";
    @ManyToOne(() => Idiomas, idioma => idioma.cod)
    idioma= Idiomas;
    @ManyToOne(() => Estados, estado => estado.estadoId)
    estado= Estados;
    @Column("float")
    price="";
   @OneToMany(() => ProdOrder, prodOrder => prodOrder.product)
    prodOrder= ProdOrder;

}