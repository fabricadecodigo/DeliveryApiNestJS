import * as mongoose from 'mongoose';

export const RestaurantSchema = new mongoose.Schema({
    name: String,
    phone: String,
    open: Boolean,
    cep: String,
    stret: String,
    number: String,
    complement: String,
    neighborhood: String,
    city: String
}, {
    collection: 'restaurant'
});
