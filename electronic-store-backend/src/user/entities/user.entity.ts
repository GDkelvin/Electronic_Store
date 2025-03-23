import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Order } from "src/order/entities/order.entity";
@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 30 })
    first_name: string

    @Column({ type: 'varchar', length: 30 })
    last_name: string

    @Column({ unique: true, type: 'varchar', length: 50 })
    email: string

    @Column({ type: 'varchar', length: 255 })
    password: string

    @Column({ type: 'text', nullable: true })
    address?: string;

    @Column({ type: 'date', nullable: true })
    birth_of_date: Date;

    @Column({ type: 'varchar', length: 20, nullable: true })
    phone_number?: string;

    @Column({ type: 'varchar', length: 50, default: 'customer' })
    role: string;

    @OneToMany(() => Order, order => order.user) 
    orders: Order[]; 
    
    @CreateDateColumn()
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date;

    @BeforeInsert()
    async hashPassword(){
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
}

