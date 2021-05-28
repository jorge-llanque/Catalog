import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Products } from './product';
import { User } from './userEntity';

@Entity()
export class RateProduct {
    @PrimaryColumn()
    id: string;

    @Column()
    admire: boolean;

    @ManyToOne( type => Products, product => product.rates)
    product: Products;

    @ManyToOne( type => User, user => user.rates)
    user: User;

}