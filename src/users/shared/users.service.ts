import { CryptService } from './../../shared/services/crypt.service';
import { IUserModel } from './iuser.model';
import { UserTypeEnum } from './user.type.enum';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRequest } from './iuser.request';
import { User } from './user';

@Injectable()
export class UsersService { 

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private cryptService: CryptService
    ) {}

    async getById(id: string) {
        return await this.userModel.findById(id)
            .select('name email type')
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
            type: UserTypeEnum.admin
        })
    }

    async createCustomer(user: IUserRequest) {
        return this.create({
            name: user.name,
            email: user.email,
            password: user.password,
            type: UserTypeEnum.customer
        })
    }

    private async create(user: IUserModel) {
        const result = await this.userModel.find({ email: user.email }).exec();
        if (result.length > 0) {
            throw new Error('O email informado já está sendo usado.')
        }

        // encriptar a senha
        user.password = await this.cryptService.crypt(user.password);

        const createdUser = new this.userModel(user);
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
