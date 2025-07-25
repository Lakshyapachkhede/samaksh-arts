const mongoose = require('mongoose');

const kitItemSchema = new mongoose.Schema({
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
    description: {
        type: String,
    },
    link: {
        type: String,
    },
 


},

    { timestamps: true }

);



const KitItems = mongoose.model("kitItem", kitItemSchema);

module.exports = KitItems;