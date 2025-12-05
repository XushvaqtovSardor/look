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
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private readonly orderModel: typeof Order,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Food) private readonly foodModel: typeof Food,
    private readonly sequelize: Sequelize,
  ) {}

  async createOrder(payload: createOrderDto) {
    const userExist = await this.userModel.findOne({
      where: {
        id: payload.userId,
      },
    });

    if (!userExist) throw new NotFoundException('User not found');

    const foodExist = await this.foodModel.findOne({
      where: {
        id: payload.foodId,
      },
    });

    if (!foodExist) throw new NotFoundException('Food not found');

    // Use transaction to prevent race condition
    const transaction = await this.sequelize.transaction();

    try {
      const [order, created] = await this.orderModel.findOrCreate({
        where: {
          userId: payload.userId,
          foodId: payload.foodId,
        },
        defaults: {
          count: payload.count,
        },
        transaction,
      });

      if (!created) {
        // Order already exists, update count
        order.count = order.count + +payload.count;
        await order.save({ transaction });
      }

      await transaction.commit();

      return {
        success: true,
        message: 'Order added successfully',
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getUserOrders(userId: number) {
    const userExist = await this.userModel.findOne({
      where: { id: userId },
    });

    if (!userExist) throw new NotFoundException('User not found');

    return await this.orderModel.findAll({
      where: { userId },
      include: [
        {
          model: Food,
          attributes: ['id', 'food_name', 'food_img'],
        },
      ],
    });
  }
}
