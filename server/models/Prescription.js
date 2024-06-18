const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
  
  },
  medication: [
    {
      name: String,
      dosage: String,
      quantity: Number,
    },
  ],
  date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
