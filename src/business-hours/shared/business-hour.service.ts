import { BusinessHour } from './business-hour';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class BusinessHourService {
    
    constructor(@InjectModel('BusinessHour') private readonly businessHourModel: Model<BusinessHour>) { }

    async getAll() {
        return await this.businessHourModel.find().exec();
    }

    async getById(id: string) {
        return await this.businessHourModel.findById(id).exec();
    }

    async create(businessHour: BusinessHour) {
        const createdDelivery = new this.businessHourModel(businessHour);
        return await createdDelivery.save();
    }

    async update(id: string, businessHour: BusinessHour) {
        return await this.businessHourModel.findByIdAndUpdate(id, businessHour, { new: true });
    }

    async delete(id: string) {
        return await this.businessHourModel.deleteOne({ _id: id }).exec();
    }
}
