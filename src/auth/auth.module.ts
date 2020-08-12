import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from './../shared/shared.module';
import { UsersModule } from './../users/users.module';
import { AuthAdminController } from './auth-admin.controller';
import { AuthCustomerController } from './auth-customer.controller';
import { JwtAdminStrategy } from './shared/admin/jwt-admin.strategy';
import { LocalAdminStrategy } from './shared/admin/local-admin.strategy';
import { AuthService } from './shared/auth.service';
import { jwtConstants } from './shared/constants';
import { JwtCustomerStrategy } from './shared/customer/jwt-customer.strategy';
import { LocalCustomerStrategy } from './shared/customer/local-customer.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '7d' },
        }),
        SharedModule,
        UsersModule
    ],
    controllers: [
        AuthAdminController,
        AuthCustomerController
    ],
    providers: [
        AuthService,
        LocalAdminStrategy,
        LocalCustomerStrategy,
        JwtAdminStrategy,
        JwtCustomerStrategy
    ],
})
export class AuthModule { }
