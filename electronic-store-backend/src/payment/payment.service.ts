import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "./entities/payment.entity";
import { Order } from "src/order/entities/order.entity";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async processPayment(dto: CreatePaymentDto) {
    const { orderId, userId, amount, paymentMethod } = dto;

    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) throw new Error("Order not found");

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    const payment = this.paymentRepository.create({
      order,
      user,
      amount,
      payment_method: paymentMethod,
      status: "completed",
    });
    await this.paymentRepository.save(payment);
    order.status = "paid";
    await this.orderRepository.save(order);

    return { message: "Payment successful", payment };
  }

  // Get all payments
  async getAllPayments(): Promise<Payment[]> {
    return await this.paymentRepository.find({ relations: ['order', 'user'] });
  }

  // Get a single payment by ID
  async getPaymentById(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { id }, relations: ['order', 'user'] });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }
}
