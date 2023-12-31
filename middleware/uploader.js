const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'pdf/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedPdf = /pdf/;
    const extension = path.extname(file.originalname);
    if (supportedPdf.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error('Must be a PDF file'));
    }
  },
  limits: {
    fileSize: 5000000,
  },
});

module.exports = uploader;
