import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createComment(createReviewDto);
  }

  @Get()
  findAll(@Query('productId') productId?: string) {
    return this.reviewService.findAll(productId ? +productId : undefined);
  }
  
  @Get('/average/:productId')
  getAverageRating(@Param('productId') productId: string) {
    return this.reviewService.getAverageRating(+productId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
