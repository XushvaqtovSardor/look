import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Food } from './entities/food.entity';
import { createFoodDto } from './dto/create.food.dto';

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Food)
    private foodModel: typeof Food,
  ) {}

  async createFood(payload: createFoodDto) {
    try {
      return await this.foodModel.create(payload as any);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findAll() {
    try {
      return await this.foodModel.findAll();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findById(id: number) {
    const food = await this.foodModel.findOne({ where: { id } });
    if (!food) throw new NotFoundException();
    return food;
  }
}
