import { OrderStatusEnum } from './shared/order-status.enum';
import { IOrderRequest } from './shared/iorder-request';
import { OrdersService } from './shared/orders.service';
import { JwtAdminAuthGuard } from './../auth/shared/admin/jwt-admin-auth.guard';
import { Controller, UseGuards, Get, Request, Body, Post, Put, Param } from '@nestjs/common';
import { Order } from './shared/order';

@UseGuards(JwtAdminAuthGuard)
@Controller('orders')
export class OrdersController {

    constructor(
        private ordersService: OrdersService
    ) { }

    @Get()
    async getAll(@Request() req): Promise<Order[]> {
        if (req?.query?.open) {
            return this.ordersService.getAllOpen(req?.query?.open === 'true');
        } else {
            return this.ordersService.getAll();
        }
    }

    @Post()
    async create(@Body() order: IOrderRequest): Promise<Order> {
        return this.ordersService.create(order);
    }

    @Put(':id')
    async updateStatus(@Param('id') id: string, @Body() body: { newStatus: OrderStatusEnum }): Promise<Order> {
        return this.ordersService.updateStatus(id, body.newStatus);
    }
}
