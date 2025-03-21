import { IsString, IsNumber, IsOptional, IsInt, IsObject } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsInt()
  categoryId: number;

  @IsInt()
  brandId: number;

  @IsInt()
  stock: number;

  @IsObject()
  attributes: Record<string, any>;
}
