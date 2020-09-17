import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAdminAuthGuard } from './../auth/shared/admin/jwt-admin-auth.guard';
import { IUpdateUserRequest } from './shared/iupdate-user.request';
import { ICreateUserRequest } from './shared/icreate-user.request';
import { User } from './shared/user';
import { UsersService } from './shared/users.service';

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
    async create(@Body() user: ICreateUserRequest): Promise<User> {
        return this.usersService.createUser(user);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: IUpdateUserRequest): Promise<User> {
        return this.usersService.update(id, user);
    }
}
