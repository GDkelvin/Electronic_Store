import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order_item/order_item.module';
import { PaymentModule } from './payment/payment.module';
import { ReviewModule } from './review/review.module';
import { CartModule } from './cart/cart.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    
    UserModule,
    ProductsModule,
    CategoryModule,
    BrandModule,
    OrderModule,
    OrderItemModule,
    PaymentModule,
    ReviewModule,
    CartModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
