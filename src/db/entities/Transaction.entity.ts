import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, JoinColumn} from 'typeorm';
import {Block} from "./Block.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 66 })
    hash: string;

    @Column('timestamp')
    timestamp: Date;

    @Column({length: 42, nullable: false})
    transactionFrom: string;

    @Column({length: 42, nullable: false})
    transactionTo: string;

    @Column()
    value: string;

    @ManyToOne(() => Block, { onDelete: 'CASCADE' })
    @JoinColumn()
    block: Block;

    @Column({ nullable: false })
    blockId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
