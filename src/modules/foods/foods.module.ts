import { Module } from '@nestjs/common';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Food } from './entities/food.entity';

@Module({
  imports:[SequelizeModule.forFeature([Food])],
  controllers: [FoodsController],
  providers: [FoodsService]
})
export class FoodsModule {}
