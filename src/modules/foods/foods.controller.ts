import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { FoodsService } from './foods.service';
import { createFoodDto } from './dto/create.food.dto';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodService: FoodsService) {}

  @Post()
  createFood(@Body() payload: createFoodDto) {
    return this.foodService.createFood(payload);
  }

  @Get('all')
  getAll() {
    return this.foodService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.foodService.findById(id);
  }
}
