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

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(payload: createUserDto) {
    try {
      const userExist = await this.userModel.findOne({
        where: { phone: payload.phone },
      });
      if (userExist) throw new ConflictException('User already exist');

      return await this.userModel.create(payload as any);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
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
      include: [Order],
    });
    if (!checkExist) throw new NotFoundException();

    return checkExist;
  }
}
