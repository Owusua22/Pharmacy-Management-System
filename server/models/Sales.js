const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Sales', salesSchema);
