import * as mongoose from 'mongoose';

export const CardapioSchema = new mongoose.Schema({
    category: mongoose.Types.ObjectId,
    name: String,
    price: Number,
    description: String
},
{
    collection: 'products'
})