import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtCustomerAuthGuard } from './../auth/shared/customer/jwt-customer-auth.guard';
import { IUpdateUserRequest } from './shared/iupdate-user.request';
import { ICreateUserRequest } from './shared/icreate-user.request';
import { User } from './shared/user';
import { UsersService } from './shared/users.service';

@Controller('customers')
export class CustomersController {

    constructor(
        private usersService: UsersService
    ) { }

    @UseGuards(JwtCustomerAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<User> {
        return this.usersService.getById(id);
    }

    @Post()
    async create(@Body() user: ICreateUserRequest): Promise<User> {
        return this.usersService.createCustomer(user);
    }

    @UseGuards(JwtCustomerAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() user: IUpdateUserRequest): Promise<User> {
        return this.usersService.update(id, user);
    }
 }
