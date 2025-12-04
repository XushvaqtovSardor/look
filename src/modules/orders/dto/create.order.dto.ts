import { IsNotEmpty, IsNumber } from "class-validator";
// import { NotEmpty } from "sequelize-typescript";

export class createOrderDto{
    @IsNumber()
    @IsNotEmpty()
    userId:number

    @IsNumber()
    @IsNotEmpty()
    foodId:number

    @IsNumber()
    @IsNotEmpty()
    count:number
}