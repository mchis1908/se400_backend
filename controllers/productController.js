const ProductModel = require('../models/product');

const ProductController = {
    GetAllProducts: async (req, res) => {
        try {
            const products = await ProductModel.find().select('id images name description price inspireImages');
            res.status(200).json({ products });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    GetProductById: async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await ProductModel.findById(productId).select('id images name description price inspireImages');
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ product });
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    DeleteProductById: async (req, res) => {
        try {
            const productId = req.params.id;
            const deletedProduct = await ProductModel.findByIdAndDelete(productId);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully'});
        } catch (error) {
            console.error('Error deleting product by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    UpdateProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const { images, name, description, price, inspireImages } = req.body;
            const updatedProduct = await ProductModel.findByIdAndUpdate(productId, {
                images,
                name,
                description,
                price,
                inspireImages
            }, { new: true });
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    CreateProduct: async (req, res) => {
        try {
            const { images, name, description, price } = req.body;
            const newProduct = new ProductModel({
                images,
                name,
                description,
                price
            });
            await newProduct.save();
            res.status(201).json({ message: 'Product created successfully', product: newProduct});
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = ProductController;
