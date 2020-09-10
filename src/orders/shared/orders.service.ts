import { OrderStatusEnum } from './order-status.enum';
import { IOrderRequest } from './iorder-request';
import { UsersService } from './../../users/shared/users.service';
import { Order } from './order';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {

    constructor(
        @InjectModel('Order') private readonly orderModel: Model<Order>,
        private usersService: UsersService
    ) {}

    private getAllOpenCloseQuery(open: boolean) {
        let query = this.orderModel.where('status');
        if (open) {
            // Pedidos que ainda não tem o status "finished"
            // ne = not equal = diferente de
            query = query.ne(OrderStatusEnum.finished)
        } else {
            query = query.equals(OrderStatusEnum.finished)
        }
        return query;
    }

    async getAllOpen(open: boolean) {
        return await this.getAllOpenCloseQuery(open).exec();
    }

    async getAllOpenByUser(userId: string, open: boolean) {
        return await this.getAllOpenCloseQuery(open).where('customer.id', userId).exec();
    }

    async getAll() {
        return await this.orderModel.find().exec();
    }

    async getAllByUser(userId: string) {
        return await this.orderModel.find({ 'customer.id': userId }).exec();
    }

    /**
     * Generate a number like #09092020081800123
     */
    private generateNumber() {
        const date = new Date();
        return `#${date.getDay()}${date.getDate() + 1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`
    }

    async create(order: IOrderRequest) {
        const user = await this.usersService.getById(order.customer.id);
        
        const createdOrder = new this.orderModel({
            ...order,
            number: this.generateNumber(),
            date: new Date(),
            status: OrderStatusEnum.created,
            customer: {
                id: order.customer.id,
                name: user.name,
                phone: user.phone
            }            
        });

        return await createdOrder.save();
    }

    async updateStatus(id: string, newStatus: OrderStatusEnum) {
        return await this.orderModel.findByIdAndUpdate(id, { status: newStatus }, { new: true });
    }
}
