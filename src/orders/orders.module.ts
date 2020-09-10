import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './../users/users.module';
import { CustomersOrdersController } from './customers-orders.controller';
import { OrdersController } from './orders.controller';
import { OrderSchema } from './schemas/order.schema';
import { OrdersService } from './shared/orders.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Order', schema: OrderSchema }
        ]),
        UsersModule
    ],
    controllers: [
        OrdersController,
        CustomersOrdersController
    ],
    providers: [
        OrdersService,
    ],
})
export class OrdersModule { }
