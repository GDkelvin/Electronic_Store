import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ILike, Like, Repository } from 'typeorm';
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

  //create product
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
  async findAll(categoryName?: string, brandName?: string): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder("product")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.brand", "brand");
  
    if (categoryName) {
      query.andWhere("category.name = :categoryName", { categoryName });
    }
    
    if (brandName) {
      const brandNames = brandName.split(","); 
      query.andWhere("brand.name IN (:...brandNames)", { brandNames });
    }
  
    return query.getMany();
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
  async findProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['brand'], });
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    return product;
  }

  async searchProductsByName(name: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { name: ILike(`%${name}%`) },
    });
  }

  //filter product by brand
  async findProductsByBrand(brandId: number) {
    return await this.productRepository.find({
      where: { brand: { id: brandId } },
      relations: ['brand'],
    });
  }

  async findProductsByBrandName(brandName: string) {
    return await this.productRepository.find({
      where: { brand: { name: brandName } },
      relations: ['brand'],
    });
  }
}
