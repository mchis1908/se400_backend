const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    images: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inspireImages: {
        type: Array,
        required: true
    },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
