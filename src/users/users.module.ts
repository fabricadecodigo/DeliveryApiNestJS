import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './../shared/shared.module';
import { CustomersController } from './customers.controller';
import { AddressSchema } from './schema/address.schema';
import { UserSchema } from './schema/user.schema';
import { UsersService } from './shared/users.service';
import { UsersController } from './users.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
            { name: 'Address', schema: AddressSchema }
        ]),
        SharedModule
    ],
    controllers: [
        UsersController,
        CustomersController
    ],
    providers: [
        UsersService
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule { }
