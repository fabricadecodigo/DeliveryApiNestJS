import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) { }

    async getAll() {
        return await this.categoryModel.find().exec();
    }

    async getById(id: string) {
        return await this.categoryModel.findById(id).exec();
    }

    async create(category: Category) {
        const createdCaategory = new this.categoryModel(category);
        return await createdCaategory.save();
    }

    async update(id: string, category: Category) {
        return await this.categoryModel.findByIdAndUpdate(id, category, { new: true });
    }

    async delete(id: string) {
        return await this.categoryModel.deleteOne({ _id: id }).exec();
    }
}
