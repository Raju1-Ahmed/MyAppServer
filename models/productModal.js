const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  demoURL: {
    type: String,
    required: true,
  },
  serverURL: {
    type: String,
    required: true,
  },
  clientURL: {
    type: String,
    required: true,
  },
  video: {
    filePath: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    file_mimetype: {
      type: String,
      required: true,
    },
  },
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  futureField: {
    type: String,
    enum: ['FullStack', 'Frontend', 'React', 'Static'], // Enum restricts the value to one of the specified strings
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
