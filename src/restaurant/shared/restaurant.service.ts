import { Restaurant } from './restaurant';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectModel('Restaurant') private readonly restaurantModel: Model<Restaurant>
    ) { }

    async get() {
        return await this.restaurantModel.findOne().exec();
    }

    async create(restaurant: Restaurant) {
        const created = new this.restaurantModel(restaurant);
        const newProduct = await created.save();
        return newProduct;
    }

    async update(id: string, restaurant) {    
        return await this.restaurantModel.findByIdAndUpdate(id, restaurant, { new: true });
    }
}
