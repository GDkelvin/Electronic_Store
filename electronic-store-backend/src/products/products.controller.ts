import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async getAllProduct(
    @Query('category') categoryName?: string,
    @Query('brand') brandName?: string
  ): Promise<Product[]> {
    return this.productsService.findAll(categoryName, brandName);
  }


  @Get('category')
  async getProductsByCategory(
    @Query('id') categoryId?: string,
    @Query('name') categoryName?: string
  ) {
    if (categoryName) {
      return await this.productsService.findProductsByCategoryName(categoryName);
    }
    if (categoryId) {
      return await this.productsService.findProductsByCategory(Number(categoryId));
    }
    return [];
  }

  @Get('search')
  async searchProducts(@Query('name') name: string): Promise<Product[]> {
    if (!name) return [];
    return this.productsService.searchProductsByName(name);
  }

  @Get('brand')
  async getProductsByBrand(
    @Query('id') brandId?: string,
    @Query('name') brandName?: string
  ) {
    if (brandName) {
      return await this.productsService.findProductsByBrandName(brandName);
    }
    if (brandId) {
      return await this.productsService.findProductsByBrand(Number(brandId));
    }
    return [];
  }

  // @Get('category/:categoryName')
  // async getProductsByCategoryName(@Param('categoryName') categoryName: string) {
  //   return await this.productsService.findProductsByCategoryName(categoryName);
  // }

  // @Get('category/:categoryId')
  // async getProductByCategory(@Param('categoryId') CategoryId: string){
  //   return await this.productsService.findProductsByCategory(Number(CategoryId));
  // }


  @Get(':id')
  async getProduct(@Param('id') id: number): Promise<Product> {
    return this.productsService.findProductById(id);
  }

}
