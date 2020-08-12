import { JwtCustomerAuthGuard } from './../auth/shared/customer/jwt-customer-auth.guard';
import { IUserRequest } from './shared/iuser.request';
import { UsersService } from './shared/users.service';
import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { User } from './shared/user';

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
    async create(@Body() user: IUserRequest): Promise<User> {
        return this.usersService.createCustomer(user);
    }

    @UseGuards(JwtCustomerAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() user: IUserRequest): Promise<User> {
        return this.usersService.update(id, user);
    }
 }
