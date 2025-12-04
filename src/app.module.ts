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
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get('DATABASE_URL');

        if (databaseUrl) {
          const url = new URL(databaseUrl);
          const needsSsl = url.searchParams.get('sslmode') === 'require';

          return {
            dialect: 'postgres',
            host: url.hostname,
            port: parseInt(url.port || '5432'),
            database: url.pathname.slice(1),
            username: url.username,
            password: url.password,
            models: [],
            autoLoadModels: true,
            synchronize: true,
            logging: false,
            pool: {
              max: 3,
              min: 0,
              acquire: 30000,
              idle: 10000,
            },
            dialectOptions: needsSsl
              ? {
                  ssl: {
                    require: true,
                    rejectUnauthorized: false,
                  },
                }
              : {},
          };
        }

        return {
          dialect: 'postgres',
          host: config.get('DB_HOST'),
          port: parseInt(config.get('DB_PORT') || '5432'),
          database: config.get('DB_DATABASE'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          models: [],
          autoLoadModels: true,
          synchronize: true,
          logging: false,
          pool: {
            max: 3,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          },
        };
      },
    }),
    UsersModule,
    FoodsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
