const mongoose = require('mongoose');

const InspirationSchema = mongoose.Schema({
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

const Inspiration = mongoose.model('Inspiration', InspirationSchema);

module.exports = Inspiration;
