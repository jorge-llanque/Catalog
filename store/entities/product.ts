import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Inventory } from './inventoryEntity';
import { RateProduct } from './rateProduct';

@Entity()
export class Products {
    @PrimaryColumn()
    id: string;

    @Column()
    imagenUrl: string;

    @Column()
    like: number;

    @Column()
    unlike: number;

    @OneToOne( type => Inventory)
    @JoinColumn()
    inventory: Inventory

    @OneToMany(type => RateProduct, rates => rates.product)
    rates: RateProduct[];

}