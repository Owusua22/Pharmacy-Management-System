const Prescription = require('../models/Prescription');

// Get all prescriptions
exports.getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({});
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new prescription
exports.addPrescription = async (req, res) => {
  const { patientName, doctorName, medication, date } = req.body;
  try {
    const newPrescription = new Prescription({ patientName, doctorName, medication, date });
    await newPrescription.save();
    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a prescription
exports.updatePrescription = async (req, res) => {
  const { patientName, doctorName, medication, date } = req.body;
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    prescription.patientName = patientName || prescription.patientName;
    prescription.doctorName = doctorName || prescription.doctorName;
    prescription.medication = medication || prescription.medication;
    prescription.date = date || prescription.date;

    const updatedPrescription = await prescription.save();
    res.json(updatedPrescription);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a prescription
exports.deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    await prescription.deleteOne();
    res.json({ message: 'Prescription removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
