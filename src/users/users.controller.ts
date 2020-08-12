import { JwtAdminAuthGuard } from './../auth/shared/admin/jwt-admin-auth.guard';
import { IUserRequest } from './shared/iuser.request';
import { UsersService } from './shared/users.service';
import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { User } from './shared/user';

@UseGuards(JwtAdminAuthGuard)
@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ) { }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<User> {
        return this.usersService.getById(id);
    }

    @Post()
    async create(@Body() user: IUserRequest): Promise<User> {
        return this.usersService.createUser(user);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: IUserRequest): Promise<User> {
        return this.usersService.update(id, user);
    }
}
