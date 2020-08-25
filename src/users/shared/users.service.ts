import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptService } from './../../shared/services/crypt.service';
import { Address } from './address';
import { IUserModel } from './iuser.model';
import { IUserRequest } from './iuser.request';
import { User } from './user';
import { UserTypeEnum } from './user.type.enum';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Address') private readonly addressModel: Model<Address>,
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

    async createUser(user: IUserRequest) {
        return this.create({
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
            type: UserTypeEnum.admin
        })
    }

    async createCustomer(user: IUserRequest) {
        const createdUser = await this.create({
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
            type: UserTypeEnum.customer
        });
        // se criou o usuário e tem endereço
        if (createdUser && user.address) {
            const { cep, stret, number, complement, neighborhood, city } = user.address;
            const address = new this.addressModel({ user: createdUser._id, cep, stret, number, complement, neighborhood, city });
            await address.save();
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

    async update(id: string, user: IUserRequest) {
        const userEntity = await this.getById(id);
        // não vou alterar a senha do usuário nesse método
        const { name, email } = user;
        userEntity.name = name;
        userEntity.email = email;

        await this.userModel.updateOne({ _id: id }, userEntity).exec();

        return userEntity;
    }
}
