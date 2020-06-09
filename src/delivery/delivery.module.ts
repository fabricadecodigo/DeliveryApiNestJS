import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryController } from './delivery.controller';
import { DeliverySchema } from './schemas/delivery.schema';
import { DeliveryService } from './shared/delivery.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Delivery', schema: DeliverySchema }
        ])
    ],
    controllers: [
        DeliveryController
    ],
    providers: [
        DeliveryService
    ],
})
export class DeliveryModule {}
