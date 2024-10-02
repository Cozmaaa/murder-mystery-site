const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  imageName: {
    type: String,
    required: true, 
  },
  level: {
    type: Number,
    required: true, 
  },
  description: {
    type: String,
    required: false, 
  }
});

// Create the Document model
const Document = mongoose.model('Document', documentSchema);

module.exports = Document;