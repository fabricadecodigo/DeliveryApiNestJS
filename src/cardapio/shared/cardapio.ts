import { Document } from 'mongoose';

export class Cardapio extends Document {
    category: string;
    name: string;
    price: number;
    description: string;
}