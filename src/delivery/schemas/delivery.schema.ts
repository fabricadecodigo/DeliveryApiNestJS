import * as mongoose from 'mongoose';

export const DeliverySchema = new mongoose.Schema({
    neighborhood: String,
    timeToDelivery: Number,
    free: Boolean,
    value: Number
});