const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  fileName: {
    type: String  // URL of the image
    
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Inventory', inventorySchema);
