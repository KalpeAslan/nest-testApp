import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Block {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    number: string;

    @CreateDateColumn()
    createdAt: Date;
}
