import { Product } from "src/products/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";

@Entity('cart')
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    user: User;

    @ManyToOne(() => Product, product => product.id)
    product: Product;

    @Column({ type: 'int', default: 1 })
    quantity: number;

    @CreateDateColumn()
    created_at: Date;
}
