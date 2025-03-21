import { Order } from "src/order/entities/order.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.id)
  order: Order;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  status: string;

  @Column({ type: 'varchar', length: 50 })
  payment_method: string;

  @CreateDateColumn()
  created_at: Date;
}
