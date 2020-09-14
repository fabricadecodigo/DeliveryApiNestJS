import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './../shared/shared.module';
import { CustomersAddressesController } from './customers-addresses.controller';
import { CustomersController } from './customers.controller';
import { AddressSchema } from './schemas/address.schema';
import { UserSchema } from './schemas/user.schema';
import { AddressService } from './shared/address.service';
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
        CustomersController,
        CustomersAddressesController
    ],
    providers: [
        UsersService,
        AddressService
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule { }
