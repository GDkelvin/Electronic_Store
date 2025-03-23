import { IsString, IsNumber, IsOptional, IsInt, IsObject, Min, Max } from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)  
  discount?: number;

  @IsInt()
  stock: number;

  @IsObject()
  attributes: Record<string, any>;
}
