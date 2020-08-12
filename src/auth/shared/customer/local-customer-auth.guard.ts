import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalCustomerAuthGuard extends AuthGuard('local-customer') { }
