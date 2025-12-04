import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { createOrderDto } from './dto/create.order.dto';
import { User } from '../users/entities/user.entity';
import { Food } from '../foods/entities/food.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private readonly orderModel: typeof Order,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Food) private readonly foodModel: typeof Food,
  ) {}

  async createOrder(payload: createOrderDto) {
    try {
      const userExist = await this.userModel.findOne({
        where: {
          id: payload.userId,
        },
      });

      if (!userExist) throw new NotFoundException();

      const foodExist = await this.foodModel.findOne({
        where: {
          id: payload.foodId,
        },
      });

      if (!foodExist) throw new NotFoundException();

      const existOrder = await this.orderModel.findOne({
        where: {
          foodId: payload.foodId,
          userId: payload.userId,
        },
      });
      if (existOrder) {
        await this.orderModel.update(
          {
            count: existOrder.count + +payload.count,
          },
          {
            where: {
              id: existOrder.id,
            },
          },
        );
      } else {
        await this.orderModel.create({
          userId: payload.userId,
          foodId: payload.foodId,
          count: payload.count,
        });
      }

      return {
        success: true,
        message: 'Order added successfully',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getUserOrders(userId: number) {
    try {
      const userExist = await this.userModel.findOne({
        where: { id: userId },
      });

      if (!userExist) throw new NotFoundException();

      return await this.orderModel.findAll({
        where: { userId },
        include: [
          {
            model: Food,
            attributes: ['id', 'food_name', 'food_img'],
          },
        ],
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
