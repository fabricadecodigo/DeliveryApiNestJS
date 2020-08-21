import { Document } from 'mongoose';

export class Address extends Document {
    user: string;
    cep: string;
    stret: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
}
