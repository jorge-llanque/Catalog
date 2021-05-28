import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { RateProduct } from './rateProduct';

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    role: string;

    @OneToMany(type => RateProduct, rates => rates.user)
    rates: RateProduct[];
}