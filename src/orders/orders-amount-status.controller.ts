import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAdminAuthGuard } from './../auth/shared/admin/jwt-admin-auth.guard';
import { IOrderAmountByStatusResponse } from './shared/iorder-amout-by-status.response';
import { OrdersService } from './shared/orders.service';

@UseGuards(JwtAdminAuthGuard)
@Controller('orders-amount-by-status')
export class OrdersAmountStatusController {
    constructor(
        private ordersService: OrdersService
    ) { }

    @Get()
    async getOrdersAmountByStatus(): Promise<IOrderAmountByStatusResponse> {
        return this.ordersService.getOrdersAmountByStatus();
    }
}
