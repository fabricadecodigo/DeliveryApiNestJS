import { LocalAdminAuthGuard } from './shared/admin/local-admin-auth.guard';
import { AuthService } from './shared/auth.service';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthAdminController {

    constructor(
        private authService: AuthService
    ) { }

    @UseGuards(LocalAdminAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }
}
