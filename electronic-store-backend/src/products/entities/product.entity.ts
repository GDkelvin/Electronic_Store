import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    discount?: number; 

    @ManyToOne(() => Category, category => category.id, {eager: true})
    category: Category;

    @ManyToOne(() => Brand, brand => brand.id, {eager: true})
    brand: Brand;

    @Column({ type: 'int', default: 0 })
    stock: number;

    @Column({ type: 'int', default: 0 })
    sales_count: number;

    @Column({ type: 'jsonb' })
    attributes: Record<string, any>;

    @Column({ type: 'text', nullable: true })
    image?: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
