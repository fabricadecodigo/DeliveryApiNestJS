import * as mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    cep: String,
    street: String,
    number: String,
    complement: String,
    neighborhood: String,
    city: String
});
