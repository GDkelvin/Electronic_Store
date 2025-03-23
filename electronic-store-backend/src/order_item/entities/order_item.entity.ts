import { Order } from "src/order/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.items, { onDelete: 'CASCADE' })
    order: Order;

    @ManyToOne(() => Product, product => product.id, { eager: true })
    product: Product;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number; // Price per unit (including discounts)
}
