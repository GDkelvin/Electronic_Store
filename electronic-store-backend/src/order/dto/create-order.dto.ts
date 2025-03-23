import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class OrderItemDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;
}

export class CreateOrderDto {
    @IsNumber()
    userId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @IsNumber()
    total_price: number;

    @IsString()
    shipping_address: string;
}
