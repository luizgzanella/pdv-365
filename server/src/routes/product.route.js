const express = require('express');
const productController = require('../controllers/product.controller');
var Multer = require('multer');
const uploadController = require('../controllers/upload.controller');

const router = express.Router();

router.post(
  '/upload',
  Multer({ storage: Multer.memoryStorage() }).single('file'),
  (req, res) => {
    uploadController.uploadFile(req, res);
  }
);

router.get('/product/', productController.getProducts);
router.post('/product/', productController.createProduct);
router.patch('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

module.exports = router;
