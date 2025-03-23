import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
      return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return await this.orderService.getAllOrders();
  }

  // Get order by ID
  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<Order> {
    return await this.orderService.getOrderById(id);
  }
}
