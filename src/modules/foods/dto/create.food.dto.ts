import { IsNotEmpty, IsString } from 'class-validator';

export class createFoodDto {
  @IsString()
  @IsNotEmpty()
  food_name: string;

  @IsString()
  @IsNotEmpty()
  food_img: string;
}
