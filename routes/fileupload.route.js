const express = require('express');
const uploader = require('../middleware/uploader');
const { fileUpload, downloadFile, getAllFiles, deleteFile, createEmail, createProduct, getProducts, getFrontendProducts, deleteProduct, getEmail } = require('../controllers/file.controllers.js'); // Update the import statement here
const router = express.Router();

router.post('/file-upload', uploader.single('pdf'), fileUpload); // Use the "fileUpload" controller here

router.post('/product', createProduct)

router.get('/find', getAllFiles).get('/product', getProducts)
// router.get('/find', getProducts);
router.get('/download/:id', downloadFile);
router.delete('/delete/:id', deleteFile).delete('/product/:id',deleteProduct);





// filter code start 
router.get('/fontend', getFrontendProducts);


module.exports = router;
