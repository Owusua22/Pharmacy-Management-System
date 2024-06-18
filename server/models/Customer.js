// server/models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  phone: { type: String, required: true, unique: true},
  gender:  { type: String, required: true }
},
 {
    timestamps: true,
  });
  



module.exports = mongoose.model('Customer', customerSchema);
