var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController')
var Image = require('../middleware/image')
/* GET home page. */
router.post('/', Image.multer.single('image'), Image.sendUploadToGCS, productController.addProduct)
router.get('/', productController.getProducts)
router.get('/category/:category', productController.getProductByCategory)
router.get('/:id', productController.getProduct)
router.put('/:id', productController.editProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router;
