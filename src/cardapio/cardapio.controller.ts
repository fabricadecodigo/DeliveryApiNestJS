import { JwtAdminAuthGuard } from './../auth/shared/admin/jwt-admin-auth.guard';
import { JwtCustomerAuthGuard } from './../auth/shared/customer/jwt-customer-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors, Req, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Cardapio } from './shared/cardapio';
import { CardapioService } from './shared/cardapio.service';
import { fileFilter } from './shared/file-filter';
import { filenameGenerator } from './shared/filename-generator';
import { Request } from 'express';

@Controller('cardapio')
export class CardapioController {

    constructor(
        private cardapioService: CardapioService
    ) { }

    @Get()
    async getAll(@Req() req: Request) {        
        return await this.cardapioService.getAll(req.query);
    }

    @UseGuards(JwtCustomerAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.cardapioService.getById(id);
    }

    @UseGuards(JwtAdminAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: filenameGenerator
        }),
        fileFilter: fileFilter,
    }))
    async create(@Body() cardapio: Cardapio, @UploadedFile() file: Express.Multer.File) {
        return await this.cardapioService.create(cardapio, file);
    }

    @UseGuards(JwtAdminAuthGuard)
    @Put(':id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: filenameGenerator
        }),
        fileFilter: fileFilter,
    }))
    async update(@Param('id') id: string, @Body() cardapio: Cardapio, @UploadedFile() file: Express.Multer.File) {
        return this.cardapioService.update(id, cardapio, file);
    }

    @UseGuards(JwtAdminAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.cardapioService.delete(id);
    }
}
