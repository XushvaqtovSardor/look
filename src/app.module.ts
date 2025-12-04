import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { FoodsModule } from './modules/foods/foods.module';
import { OrdersModule } from './modules/orders/orders.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    SequelizeModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(config : ConfigService) => ({
        dialect:"postgres",
        host:config.get("DB_HOST"),
        port:config.get("DB_PORT"),
        database:config.get("DB_DATABASE"),
        username:config.get("DB_USERNAME"),
        password:config.get("DB_PASSWORD"),
        models:[],
        autoLoadModels:true,
        synchronize:true,
        logging:true
      })
    }),
    UsersModule,
    FoodsModule, 
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
