import { IJwtPayload } from './ijwt-payload';
import { IUserData } from './iuser-date';
import { CryptService } from './../../shared/services/crypt.service';
import { UsersService } from './../../users/shared/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private cryptService: CryptService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<IUserData> { 
        const user = await this.usersService.getByEmail(email);
        if (user && this.cryptService.compare(password, user.password)) {
            const { _id, name, email, type } = user;
            
            return { id: _id , name, email, type };
        }

        return null;
    }

    async login(user: IUserData) {
        const payload: IJwtPayload = { sub: user.id, name: user.name, email: user.email, type: user.type };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
