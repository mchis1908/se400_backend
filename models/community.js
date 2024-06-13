const mongoose = require('mongoose');

const CommunitySchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    weight:{
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true,
    }
});

const Community = mongoose.model('Community', CommunitySchema);

module.exports = Community;
