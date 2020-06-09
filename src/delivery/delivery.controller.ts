import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Delivery } from './shared/delivery';
import { DeliveryService } from './shared/delivery.service';

@Controller('delivery')
export class DeliveryController {
    constructor(
        private deliveryService: DeliveryService
    ) { }

    @Get()
    async getAll() {
        return await this.deliveryService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.deliveryService.getById(id);
    }

    @Post()
    async create(@Body() delivery: Delivery) {
        return await this.deliveryService.create(delivery);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() delivery: Delivery) {
        return this.deliveryService.update(id, delivery);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.deliveryService.delete(id);
    }
}
