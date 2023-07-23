// controllers/file.controller.js
const PDF = require('../models/model.js');
const fs = require('fs'); // Add this line to import the 'fs' module


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
exports.downloadFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
};
