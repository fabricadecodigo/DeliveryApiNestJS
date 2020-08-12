import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './../auth.service';

@Injectable()
export class LocalCustomerStrategy extends PassportStrategy(Strategy, 'local-customer') {

    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string) {
        const user = await this.authService.validateUser(email, password);        
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
