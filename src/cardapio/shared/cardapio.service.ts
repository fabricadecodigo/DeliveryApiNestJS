import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { unlinkSync } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { Cardapio } from './cardapio';

@Injectable()
export class CardapioService {
    constructor(@InjectModel('Cardapio') private readonly cardapioModel: Model<Cardapio> ) { }

    async getAll() {
        return await this.cardapioModel.find().populate('category').exec();
    }

    async getById(id: string) {
        return await this.cardapioModel.findById(id).exec();
    }

    private getPhotoUrl(filename: string) {
        return `http://192.168.1.106:3000/${filename}`;
    }

    async create(cardapio: Cardapio, file: Express.Multer.File) {
        if (file) {
            cardapio.photoUrl = this.getPhotoUrl(file.filename);
        }

        const createdProduct = new this.cardapioModel(cardapio);
        const newProduct = await createdProduct.save();
        return newProduct;
    }

    async update(id: string, cardapio: Cardapio, file: Express.Multer.File) {
        // se veio uma imagem
        if (file) {
            // procuro o produto para ver se ele já tem foto
            const product = await this.getById(id);

            if (product.photoUrl) {
                // se tem foto eu vou deletar a foto antiga
                const imageName = product.photoUrl.substring(product.photoUrl.lastIndexOf('/') + 1);
                const imagePath = join(__dirname, '..', '..', '..', 'uploads', imageName);
                unlinkSync(imagePath);
            }

            cardapio.photoUrl = this.getPhotoUrl(file.filename);
        }

        return await this.cardapioModel.findByIdAndUpdate(id, cardapio, { new: true });
    }

    async delete(id: string) {
        return await this.cardapioModel.deleteOne({ _id: id }).exec();
    }
}
