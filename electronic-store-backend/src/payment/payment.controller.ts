import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async makePayment(@Body() createPaymentDto: CreatePaymentDto) {
      return this.paymentService.processPayment(createPaymentDto);
  } 

  @Get()
  async getAllPayments(): Promise<Payment[]> {
    return await this.paymentService.getAllPayments();
  }

  // Get payment by ID
  @Get(':id')
  async getPaymentById(@Param('id') id: number): Promise<Payment> {
    return await this.paymentService.getPaymentById(id);
  }
}
