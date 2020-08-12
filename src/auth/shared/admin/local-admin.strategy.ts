import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserTypeEnum } from '../../../users/shared/user.type.enum';
import { AuthService } from './../auth.service';

@Injectable()
export class LocalAdminStrategy extends PassportStrategy(Strategy, 'local-admin') {

    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string) {
        const user = await this.authService.validateUser(email, password);
        // não vou deixar clientes logarem no app do restaurante
        if (!user || user.type != UserTypeEnum.admin) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
