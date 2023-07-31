const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
