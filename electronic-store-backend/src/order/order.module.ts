import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/order_item/entities/order_item.entity';
import { Product } from 'src/products/entities/product.entity';
import { Order } from './entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product])],
  controllers: [OrderController],
  providers: [OrderService],
  //exports: [OrderService],
})
export class OrderModule {}
