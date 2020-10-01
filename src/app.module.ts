import { OrdersModule } from './orders/orders.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BusinessHoursModule } from './business-hours/business-hours.module';
import { CardapioModule } from './cardapio/cardapio.module';
import { CategoryModule } from './categories/category.module';
import { DeliveryModule } from './delivery/delivery.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`, 
      { useFindAndModify: false }),
    CategoryModule,
    DeliveryModule,
    BusinessHoursModule,
    CardapioModule,
    UsersModule,
    AuthModule,
    RestaurantModule,
    OrdersModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
