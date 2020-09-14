import { Address } from './address';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AddressService {

    constructor(@InjectModel('Address') private readonly addressModel: Model<Address>) { }

    async getAllByUser(userId: string) {
        return await this.addressModel.find({ user: userId })
            .exec();
    }

    async save(userId: string, cep: string, street: string, number: string, complement: string, neighborhood: string) {
        const existsAddress = await this.addressModel.findOne({ user: userId })
            .exec();

        const address = {
            user: userId,
            cep,
            street,
            number,
            complement,
            neighborhood
        }

        if (existsAddress) {
            return await this.addressModel.updateOne({ _id: existsAddress._id }, address, { new: true });
        } else {
            const createdAddress = new this.addressModel(address);
            return await createdAddress.save();
        }
    }
}
