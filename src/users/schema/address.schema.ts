import * as mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    cep: String,
    stret: String,
    number: String,
    complement: String,
    neighborhood: String,
    city: String
});
