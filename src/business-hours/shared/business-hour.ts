import { Document } from 'mongoose';

export class BusinessHour extends Document {
    dayOfWeek: number;
    start: Date;
    end: Date;
}