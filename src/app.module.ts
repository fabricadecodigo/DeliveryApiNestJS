import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessHoursModule } from './business-hours/business-hours.module';
import { CardapioModule } from './cardapio/cardapio.module';
import { CategoryModule } from './categories/category.module';
import { DeliveryModule } from './delivery/delivery.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    CardapioModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
