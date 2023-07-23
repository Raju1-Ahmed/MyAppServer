// models/pdf.model.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  filePath: String,
});

const PDF = mongoose.model('PDF', fileSchema);

module.exports = PDF;
