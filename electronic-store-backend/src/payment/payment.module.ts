import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Payment } from './entities/payment.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order, User, Product])],
  controllers: [PaymentController],
  providers: [PaymentService],
  //exports: [PaymentService],
})
export class PaymentModule {}
