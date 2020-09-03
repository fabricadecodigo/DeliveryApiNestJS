import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtCustomerAuthGuard } from './../auth/shared/customer/jwt-customer-auth.guard';
import { Address } from './shared/address';
import { AddressService } from './shared/address.service';

@UseGuards(JwtCustomerAuthGuard)
@Controller('customers-addresses')
export class CustomersAddressesController {

    constructor(
        private addressService: AddressService
    ) {}

    @Get()
    async getAllByUser(@Request() req: any): Promise<Address[]> {
        console.log(req.user);
        return this.addressService.getAllByUser(req.user.sub);
    }
 }
