import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { OrderItem } from "src/order_item/entities/order_item.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { User } from "src/user/entities/user.entity";
import { Product } from "src/products/entities/product.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  // Get all orders
  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find({ relations: ['user'] });
  }

  // Get a single order by ID
  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.product', 'user'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  //Post order
  async createOrder(dto: CreateOrderDto) {
    const { userId, items, total_price, shipping_address } = dto;

    const order = this.orderRepository.create({
      user: { id: userId } as User,
      total_price,
      shipping_address,
      status: "pending",
    });

    const savedOrder = await this.orderRepository.save(order);

    const orderItems = items.map(item => {
      return this.orderItemRepository.create({
        order: savedOrder,
        product: { id: item.productId } as Product,
        quantity: item.quantity,
        price: item.price,
      });
    });

    await this.orderItemRepository.save(orderItems);

    return savedOrder;
  }

  
}
