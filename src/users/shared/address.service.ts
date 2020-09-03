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
}
