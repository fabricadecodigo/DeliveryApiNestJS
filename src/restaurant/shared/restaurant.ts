import { Document } from 'mongoose';

export class Restaurant extends Document {
    name: string;
    phone: string;
    open: boolean;
    cep: string;
    stret: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
}
