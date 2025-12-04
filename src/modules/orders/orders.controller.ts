import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrderDto } from './dto/create.order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  createOrder(@Body() payload: createOrderDto) {
    return this.orderService.createOrder(payload);
  }

  @Get('user/:userId')
  getUserOrders(@Param('userId', ParseIntPipe) userId: number) {
    return this.orderService.getUserOrders(userId);
  }
}
