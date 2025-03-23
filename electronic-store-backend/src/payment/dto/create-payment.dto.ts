import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
    @IsNumber()
    orderId: number;

    @IsNumber()
    userId: number;

    @IsNumber()
    amount: number;

    @IsString()
    paymentMethod: string;
}
