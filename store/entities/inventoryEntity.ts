import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Inventory {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;
}