const ProductModel = require('../models/product');

const ProductController = {
    GetAllProducts: async (req, res) => {
        try {
            const products = await ProductModel.find().select('id images name description price');
            res.status(200).json({ products });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = ProductController;
