import { Order } from "src/order/entities/order.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.payments, { onDelete: 'CASCADE' })
    order: Order;

    @ManyToOne(() => User, user => user.id, { eager: true })
    user: User;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'varchar', length: 50 })
    payment_method: string; // e.g., 'credit_card', 'paypal'

    @Column({ type: 'varchar', length: 50, default: 'pending' })
    status: string; // 'pending' | 'completed' | 'failed'

    @CreateDateColumn()
    created_at: Date;
}
