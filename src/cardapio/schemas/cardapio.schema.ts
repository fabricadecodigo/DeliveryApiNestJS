import * as mongoose from 'mongoose';

export const CardapioSchema = new mongoose.Schema({
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Categories'
    },
    name: String,
    price: Number,
    description: String,
    photoUrl: String
},
{
    collection: 'products'
})