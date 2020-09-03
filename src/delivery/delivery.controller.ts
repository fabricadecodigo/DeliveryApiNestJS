import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAdminAuthGuard } from './../auth/shared/admin/jwt-admin-auth.guard';
import { JwtCustomerAuthGuard } from './../auth/shared/customer/jwt-customer-auth.guard';
import { Delivery } from './shared/delivery';
import { DeliveryService } from './shared/delivery.service';

@Controller('delivery')
export class DeliveryController {
    constructor(
        private deliveryService: DeliveryService
    ) { }

    @UseGuards(JwtCustomerAuthGuard)
    @Get()
    async getAll() {
        return await this.deliveryService.getAll();
    }

    @UseGuards(JwtAdminAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.deliveryService.getById(id);
    }

    @UseGuards(JwtAdminAuthGuard)
    @Post()
    async create(@Body() delivery: Delivery) {
        return await this.deliveryService.create(delivery);
    }

    @UseGuards(JwtAdminAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() delivery: Delivery) {
        return this.deliveryService.update(id, delivery);
    }

    @UseGuards(JwtAdminAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.deliveryService.delete(id);
    }
}
