import * as mongoose from 'mongoose';

export const BusinessHourSchema = new mongoose.Schema({
    dayOfWeek: Number,
    start: Date,
    end: Date
});