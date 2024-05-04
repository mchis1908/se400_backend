const ProductController = require('../controllers/productController');
const router = require('express').Router()

router.get('/', ProductController.GetAllProducts)
router.get('/:id', ProductController.GetProductById)
router.delete('/:id', ProductController.DeleteProductById)
router.put('/:id', ProductController.UpdateProduct)
router.post('/', ProductController.CreateProduct)

module.exports = router