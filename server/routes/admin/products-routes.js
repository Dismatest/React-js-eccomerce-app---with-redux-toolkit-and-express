

const express = require('express');

const { handleImageUpload, addProduct, editProduct, deleteProduct, fetchAllProducts } = require('../../controllers/admin/product-controller');

const {upload} = require('../../helpers/cloudinary');

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), handleImageUpload);

router.post('/add-product', addProduct);
router.put('/edit-product/:id', editProduct);
router.delete('/delete-product/:id', deleteProduct);
router.get('/get-product', fetchAllProducts);

module.exports = router;