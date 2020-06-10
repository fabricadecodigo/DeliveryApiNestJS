import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Cardapio } from './shared/cardapio';
import { CardapioService } from './shared/cardapio.service';

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
    async create(@Body() cardapio: Cardapio) {
        return await this.cardapioService.create(cardapio);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() cardapio: Cardapio) {
        return this.cardapioService.update(id, cardapio);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.cardapioService.delete(id);
    }
}
