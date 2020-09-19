import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from './../../users/shared/users.service';
import { IOrderAmountByStatusResponse } from './iorder-amout-by-status.response';
import { IOrderRequest } from './iorder-request';
import { Order } from './order';
import { OrderStatusEnum } from './order-status.enum';

@Injectable()
export class OrdersService {

    constructor(
        @InjectModel('Order') private readonly orderModel: Model<Order>,
        private usersService: UsersService
    ) { }

    getById(id: string) {
        return this.orderModel.findById(id).exec();
    }

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

    async getOrdersAmountByStatus() {
        const today = new Date();

        let tomorrow = new Date(today.valueOf());
        tomorrow.setDate(tomorrow.getUTCDate() + 1);

        let yesterday = new Date(today.valueOf());
        yesterday.setDate(yesterday.getUTCDate() - 1);

        const openOrdersQuery = this.getAllOpenCloseQuery(true);
        const closeOrdersQuery = this.getAllOpenCloseQuery(false);

        const amountCreated = await openOrdersQuery.find({ status: OrderStatusEnum.created }).exec();
        const amountConfirmed = await openOrdersQuery.find({ status: OrderStatusEnum.confirmed }).exec();
        const amountAvailableToDelivery = await openOrdersQuery.find({ status: OrderStatusEnum.availableToDelivery }).exec();
        const amountFinished = await closeOrdersQuery.where('date').gt(yesterday).lt(tomorrow).exec();

        const result: IOrderAmountByStatusResponse = {
            amountCreated: amountCreated.length,
            amountConfirmed: amountConfirmed.length,
            amountAvailableToDelivery: amountAvailableToDelivery.length,
            amountFinished: amountFinished.length
        }

        return result;
    }
}
