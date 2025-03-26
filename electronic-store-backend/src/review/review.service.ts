import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createComment(createReviewDto: CreateReviewDto) {
    const { productId, userId, rating, comment } = createReviewDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!user || !product) {
      throw new Error('Invalid userId or productId');
    }

    const review = this.reviewRepository.create({
      user, product, rating, comment
    });
    await this.reviewRepository.save(review);

    return { message: "Comment successful!", review };
  }

  async findAll() {
    return this.reviewRepository.find({
      relations: ['user', 'product'],
      order: { created_at: 'DESC' },
    });
  }

  async getAverageRating(productId: number) {
    const result = await this.reviewRepository
      .createQueryBuilder("review")
      .select("AVG(review.rating)", "averageRating")
      .where("review.productId = :productId", { productId })
      .getRawOne();

    return { averageRating: parseFloat(result.averageRating) || 0 };
  }


  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
