const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
    },
    height: {
        type: Number,
    },
    width: {
        type: Number,
    },
    unit: {
        type: String,
    },
    isForSale: {
        type: Boolean
    },
    price: {
        type: Number
    },
    isAvailable:{
        type: Boolean
    }


},

    { timestamps: true }

);



const Painting = mongoose.model("painting", paintingSchema);

module.exports = Painting;