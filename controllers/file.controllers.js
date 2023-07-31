// controllers/file.controller.js
const PDF = require('../models/model.js');
const fs = require('fs'); // Add this line to import the 'fs' module
const Product = require('../models/productModal.js');


exports.fileUpload = async (req, res, next) => {
  try {
    // Assuming you are using the "uploader" middleware to handle file upload
    const { filename, path } = req.file;

    // Save file details to MongoDB
    const pdf = new PDF({
      filename,
      filePath: path,
    });
    await pdf.save();

    res.status(200).json({ message: 'File uploaded successfully!', pdf });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};


exports.getAllFiles = async (req, res, next) => {
  try {
    const files = await PDF.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
};

exports.deleteFile = async (req, res, next) => {
  try {
    const fileId = req.params.id;
    const file = await PDF.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Remove the file from the database
    await file.remove();

    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error('Error while deleting the file:', err);
    res.status(500).json({ message: 'Error while deleting the file' });
  }
};


exports.downloadFile = async (req, res, next) => {
  try {
    const fileId = req.params.id;
    const file = await PDF.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    console.log('File data:', file); // Add a log to check the file data

    res.download(file.filePath, file.filename, (err) => {
      if (err) {
        console.error('Error while downloading:', err);
        return res.status(500).json({ message: 'Error while downloading the file' });
      }
    });
  } catch (err) {
    console.error('Error while fetching the file:', err);
    res.status(500).json({ message: 'Error while fetching the file' });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      demoURL,
      serverURL,
      clientURL,
      date,
      video,
      futureField,
    } = req.body;

    const product = new Product({
      name,
      description,
      demoURL,
      serverURL,
      clientURL,
      date,
      video,
      futureField,
    });

    await product.save();

    res.status(201).json({ message: 'Product created successfully' });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Error creating product' });
  }
};


// Get all products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error('Error while fetching products:', err);
    res.status(500).json({ message: 'Error while fetching products' });
  }
};


exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product from the database
    await product.remove();

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error while deleting the product:', err);
    res.status(500).json({ message: 'Error while deleting the product' });
  }
};



// filtering start here 
exports.getFrontendProducts = async (req, res, next) => {
  try {
    const frontendProducts = await Product.find({ futureField: 'Frontend' });

    res.status(200).json(frontendProducts);
  } catch (err) {
    console.error('Error fetching frontend products:', err);
    res.status(500).json({ message: 'Error fetching frontend products' });
  }
};
