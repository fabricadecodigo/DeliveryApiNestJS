import { JwtAdminAuthGuard } from './../auth/shared/admin/jwt-admin-auth.guard';
import { JwtCustomerAuthGuard } from './../auth/shared/customer/jwt-customer-auth.guard';
import { RestaurantService } from './shared/restaurant.service';
import { Controller, UseGuards, Get, Post, Body, Put, Param } from '@nestjs/common';
import { Restaurant } from './shared/restaurant';

@Controller('restaurant')
export class RestaurantController {

    constructor(private restaurantService: RestaurantService) { }

    @UseGuards(JwtCustomerAuthGuard)
    @Get()
    async get() {
        return await this.restaurantService.get();
    }

    @UseGuards(JwtAdminAuthGuard)
    @Post()
    async create(@Body() restaurant: Restaurant) {
        return await this.restaurantService.create(restaurant);
    }

    @UseGuards(JwtAdminAuthGuard)
    @Put(':id')    
    async update(@Param('id') id: string, @Body() restaurant: Restaurant) {
        return this.restaurantService.update(id, restaurant);
    }
}
