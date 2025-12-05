import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
// import { NotEmpty } from "sequelize-typescript";

export class createOrderDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  foodId: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(2147483647)
  count: number;
}
