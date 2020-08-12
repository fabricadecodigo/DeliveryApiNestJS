import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtCustomerAuthGuard extends AuthGuard('jwt-customer') { }
