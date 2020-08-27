import { JwtCustomerAuthGuard } from './../auth/shared/customer/jwt-customer-auth.guard';
import { JwtAdminAuthGuard } from './../auth/shared/admin/jwt-admin-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BusinessHour } from './shared/business-hour';
import { BusinessHourService } from './shared/business-hour.service';

@Controller('businesshours')
export class BusinessHoursController {

    constructor(
        private businessHourService: BusinessHourService
    ) { }

    @UseGuards(JwtCustomerAuthGuard)
    @Get()
    async getAll() {
        return await this.businessHourService.getAll();
    }

    @UseGuards(JwtAdminAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.businessHourService.getById(id);
    }

    @UseGuards(JwtAdminAuthGuard)
    @Post()
    async create(@Body() businessHour: BusinessHour) {
        return await this.businessHourService.create(businessHour);
    }

    @UseGuards(JwtAdminAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() businessHour: BusinessHour) {
        return this.businessHourService.update(id, businessHour);
    }

    @UseGuards(JwtAdminAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.businessHourService.delete(id);
    }
}
