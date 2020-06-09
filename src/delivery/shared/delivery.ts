import { Document } from 'mongoose';

export class Delivery extends Document {
    neighborhood: string;
    timeToDelivery: number;
    free: boolean;
    value: number;
}