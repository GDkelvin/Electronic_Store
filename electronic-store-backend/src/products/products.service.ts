import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { error } from 'console';

@Injectable()
export class ProductsService {
  
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category) 
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Brand) 
    private readonly brandRepository: Repository<Brand>,
   
  ) { }
  
  //
  async create(createProductDto: CreateProductDto) {
    const { categoryId, brandId, ...productData } = createProductDto;
  
    
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    const brand = await this.brandRepository.findOne({ where: { id: brandId } });
  
    if (!category || !brand) {
      throw new Error('Invalid categoryId or brandId');
    }
  
    const newProduct = this.productRepository.create({
      ...productData,
      category,
      brand,
    });
  
    return this.productRepository.save(newProduct);
  }

  //get all product
  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    //console.log("Products from DB:", products);
    return products;
  }

  //filter product by category
  async findProductsByCategory(categoryId: number) {
    return await this.productRepository.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
    });
  }

  async findProductsByCategoryName(categoryName: string) {
    return await this.productRepository.find({
      where: { category: { name: categoryName } }, 
      relations: ['category'], 
    });
  }

  //get 1 product
  async findProductById(id: number): Promise<Product>{
    const product = await this.productRepository.findOne({where: {id}, relations: ['brand'],});
    if(!product){
      throw new NotFoundException("Product not found");
    }
    return product;
  }


  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
