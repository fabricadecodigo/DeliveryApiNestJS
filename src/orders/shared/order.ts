import { Document } from 'mongoose';

export class Order extends Document {
    number: string;
    date: Date;
    status: number;
    total: number;
    customer: {
        id: string;
        name: string;
        phone: string;
    };
    address: {
        stret: string;
        number: string;
        complement: string;
        neighborhood: string;
        city: string
    };
    deliveryPlaceType: number;
    delivery: {
        free: boolean,
        tax: number,
    };
    payment: {
        paymentType: number;
        changeFor: number;
        cardType: number;
    };
    items: [{ 
        name: string;
        description: string;
        notes: string;
        price: number;
        quantity: number;
        total: number
    }]
}
