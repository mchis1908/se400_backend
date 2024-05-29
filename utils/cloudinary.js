const { configDotenv } = require('dotenv');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

configDotenv();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "SE400",
        allowed_formats: ["jpg", "png", "jpeg"],
        unique_filename: true
    }
});

module.exports = {
    cloudinaryAPI: cloudinary,
    storage
};