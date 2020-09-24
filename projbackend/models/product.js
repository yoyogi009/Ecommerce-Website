const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32
    },
    category: {
        type: ObjectId, // we are linking this category to other schema
        ref: "Category",  //pulling from Category Schema
        required: true
    },
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer, // img are stored in buffer
        contentTypes: String
    }
}, 
{timestamps: true}
);