import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { createUserDto } from './dto/create.user.dto';
import { Order } from '../orders/entities/order.entity';
import { Food } from '../foods/entities/food.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(payload: createUserDto) {
    const userExist = await this.userModel.findOne({
      where: { phone: payload.phone },
    });
    if (userExist) throw new ConflictException('User already exist');

    return await this.userModel.create(payload as any);
  }
  async findAll() {
    try {
      return await this.userModel.findAll();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findById(id: number) {
    const checkExist = await this.userModel.findOne({
      where: { id },
      include: [
        {
          model: Food,
          attributes: ['food_name', 'food_img'],
        },
      ],
    });
    if (!checkExist) throw new NotFoundException();

    return checkExist;
  }
}
