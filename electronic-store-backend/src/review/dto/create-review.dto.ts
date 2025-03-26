import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
    @IsString()
    comment: string;

    @IsInt()
    rating: number;

    @IsInt()
    userId: number;

    @IsInt()
    productId: number;
}
