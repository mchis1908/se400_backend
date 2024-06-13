const CommunityModel = require('../models/community');
const ProductModel = require('../models/product');
const axios = require('axios');

const model_url = process.env.MODEL_URL || 'http://localhost:5000/api/search_image';

async function searchImage(imageUrl) {
    try {
        const response = await axios.post(model_url, { image_url: imageUrl });
        return response.data;
    } catch (error) {
        console.error('Error searching image:', error);
        throw error; 
    }
}

function extractPath(fullPath) {
    const match = fullPath.match(/\\([^\\]+)\.jpg$/);
    return match ? match[1] : null;
}

const CommunityController = {
    GetAllInspire: async (req, res) => {
        try {
            const inspirations = await CommunityModel.find();
            res.status(200).json({ inspirations });
        } catch (error) {
            console.error('Error fetching inspiration:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    CreateInspire: async (req, res) => {
        try {
            const { image, name, height, weight, size } = req.body;
            const newInspiration = new CommunityModel({
                image, name, height, weight, size
            });
            await newInspiration.save();
            // Gọi hàm searchImage sau khi lưu thành công
            const searchData = await searchImage(newInspiration.image);

            // Lấy tất cả giá trị path từ searchData
            const inspireImages = searchData.flatMap(item =>
                item.results.map(result => extractPath(result.path)).filter(Boolean)
            );

            const uniqueInspireImages = [...new Set(inspireImages)];

            // Cập nhật bảng products với inspireImage
            for (const imageId of uniqueInspireImages) {
                await ProductModel.findByIdAndUpdate(
                    imageId,
                    { $push: { inspireImages: image } },
                    { new: true, useFindAndModify: false }
                );
            }
            res.status(201).json({ message: 'Inspiration created successfully', inspiration: newInspiration, inspireImages: uniqueInspireImages});
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = CommunityController;
