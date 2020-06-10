import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardapioController } from './cardapio.controller';
import { CardapioSchema } from './schemas/cardapio.schema';
import { CardapioService } from './shared/cardapio.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Cardapio', schema: CardapioSchema }
        ])
    ],
    controllers: [
        CardapioController, 
    ],
    providers: [
        CardapioService
    ],
})
export class CardapioModule {}
