import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './restaurant.controller';
import { RestaurantSchema } from './schema/restaurante.schema';
import { RestaurantService } from './shared/restaurant.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Restaurant', schema: RestaurantSchema }
        ])
    ],
    controllers: [
        RestaurantController
    ],
    providers: [
        RestaurantService
    ],
})
export class RestaurantModule { }
