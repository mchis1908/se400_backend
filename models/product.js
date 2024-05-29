const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    image: {
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
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
