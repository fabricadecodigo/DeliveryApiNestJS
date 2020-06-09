import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessHoursController } from './business-hours.controller';
import { BusinessHourSchema } from './schemas/business-hour.schema';
import { BusinessHourService } from './shared/business-hour.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'BusinessHour', schema: BusinessHourSchema }
        ])
    ],
    controllers: [
        BusinessHoursController
    ],
    providers: [
        BusinessHourService
    ],
})
export class BusinessHoursModule { }
