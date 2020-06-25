import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cardapio } from './cardapio';

@Injectable()
export class CardapioService {
    constructor(@InjectModel('Cardapio') private readonly cardapioModel: Model<Cardapio>) { }

    async getAll() {
        return await this.cardapioModel.find().populate('category').exec();
    }

    async getById(id: string) {
        return await this.cardapioModel.findById(id).exec();
    }

    async create(cardapio: Cardapio) {
        const createdProduct = new this.cardapioModel(cardapio);
        return await createdProduct.save();
    }

    async update(id: string, cardapio: Cardapio) {
        return await this.cardapioModel.findByIdAndUpdate(id, cardapio, { new: true });
    }

    async delete(id: string) {
        return await this.cardapioModel.deleteOne({ _id: id }).exec();
    }
}
