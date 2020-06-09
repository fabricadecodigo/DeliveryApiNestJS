import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Delivery } from './delivery';

@Injectable()
export class DeliveryService {

    constructor(@InjectModel('Delivery') private readonly deliveryModel: Model<Delivery>) { }

    async getAll() {
        return await this.deliveryModel.find().exec();
    }

    async getById(id: string) {
        return await this.deliveryModel.findById(id).exec();
    }

    async create(delivery: Delivery) {
        const createdDelivery = new this.deliveryModel(delivery);
        return await createdDelivery.save();
    }

    async update(id: string, delivery: Delivery) {
        return await this.deliveryModel.findByIdAndUpdate(id, delivery, { new: true });
    }

    async delete(id: string) {
        return await this.deliveryModel.deleteOne({ _id: id }).exec();
    }
}
