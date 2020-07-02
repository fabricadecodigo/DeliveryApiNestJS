import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Cardapio } from './shared/cardapio';
import { CardapioService } from './shared/cardapio.service';
import { fileFilter } from './shared/file-filter';
import { filenameGenerator } from './shared/filename-generator';

@Controller('cardapio')
export class CardapioController {

    constructor(
        private cardapioService: CardapioService
    ) { }

    @Get()
    async getAll() {
        return await this.cardapioService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.cardapioService.getById(id);
    }

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

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.cardapioService.delete(id);
    }
}
