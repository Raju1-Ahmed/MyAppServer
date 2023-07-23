const express = require('express');
const uploader = require('../middleware/uploader');
const { fileUpload, downloadFile, getAllFiles } = require('../controllers/file.controllers.js'); // Update the import statement here
const router = express.Router();

router.post('/file-upload', uploader.single('pdf'), fileUpload); // Use the "fileUpload" controller here

router.get('/find', getAllFiles);
router.get('/download/:id', downloadFile);

module.exports = router;
