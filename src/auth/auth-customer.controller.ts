import { LocalCustomerAuthGuard } from './shared/customer/local-customer-auth.guard';
import { AuthService } from './shared/auth.service';
import { Controller, UseGuards, Post, Request } from '@nestjs/common';

@Controller('auth-customer')
export class AuthCustomerController { 

    constructor(
        private authService: AuthService
    ) { }

    @UseGuards(LocalCustomerAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

}
