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

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    MongooseModule.forRoot('mongodb+srv://db_user:XOAUz2NhkBio5hVP@cluster0-sqxxz.gcp.mongodb.net/delivery?retryWrites=true&w=majority',
      { useFindAndModify: false }),
    CategoryModule,
    DeliveryModule,
    BusinessHoursModule,
    CardapioModule,
    UsersModule,
    AuthModule,
    RestaurantModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
