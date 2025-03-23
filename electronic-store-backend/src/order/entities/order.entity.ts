import { User } from "src/user/entities/user.entity";
import { OrderItem } from "src/order_item/entities/order_item.entity";
import { Payment } from "src/payment/entities/payment.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.orders, { eager: true })
    user: User;

    @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
    items: OrderItem[];

    @OneToMany(() => Payment, payment => payment.order)
    payments: Payment[];

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_price: number;

    @Column({ type: 'varchar', length: 50, default: 'pending' })
    status: string; // 'pending' | 'paid' | 'shipped' | 'cancelled'

    @Column({ type: 'varchar', length: 255, nullable: true })
    shipping_address: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
