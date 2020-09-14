import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptService } from './../../shared/services/crypt.service';
import { AddressService } from './address.service';
import { ICreateUserRequest } from './icreate-user.request';
import { IUpdateUserRequest } from './iupdate-user.request';
import { IUserModel } from './iuser.model';
import { User } from './user';
import { UserTypeEnum } from './user.type.enum';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly addressService: AddressService,
        private cryptService: CryptService
    ) { }

    async getById(id: string) {
        return await this.userModel.findById(id)
            .select('name email type phone')
            .exec();
    }

    async getByEmail(email: string) {
        return await this.userModel.findOne({ email })
            .exec();
    }

    async createUser(user: ICreateUserRequest) {
        return this.create({
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
            type: UserTypeEnum.admin
        })
    }

    async createCustomer(user: ICreateUserRequest) {
        const createdUser = await this.create({
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
            type: UserTypeEnum.customer
        });
        // se criou o usuário e tem endereço
        if (createdUser && user.address) {
            const { cep, street, number, complement, neighborhood } = user.address;
            await this.addressService.save(createdUser._id, cep, street, number, complement, neighborhood);
        }
        return createdUser;
    }

    private async create(userModel: IUserModel) {
        const result = await this.userModel.find({ email: userModel.email }).exec();
        if (result.length > 0) {
            throw new Error('O email informado já está sendo usado.')
        }
        let { name, email, password, phone, type } = userModel;
        // encriptar a senha
        password = await this.cryptService.crypt(password);

        const createdUser = new this.userModel({ name, email, password, phone, type });
        return await createdUser.save();
    }

    async update(id: string, user: IUpdateUserRequest) {
        const userEntity = await this.getById(id);
        userEntity.name = user.name;
        userEntity.phone = user.phone;

        await this.userModel.updateOne({ _id: id }, userEntity).exec();
        // se tem endereço
        if (user.address) {
            const { cep, street, number, complement, neighborhood } = user.address;
            await this.addressService.save(userEntity._id, cep, street, number, complement, neighborhood);
        }

        return userEntity;
    }
}
