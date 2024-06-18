const express = require('express');
const { getPrescriptions, addPrescription, updatePrescription, deletePrescription } = require('../controllers/prescriptionController');
const { protect,  } = require('../middleware/authMiddleware');
const { role } = require('../middleware/roleMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getPrescriptions)
  .post(protect, role('admin'), addPrescription);

router.route('/:id')
  .put(protect, role('admin'), updatePrescription)
  .delete(protect, role('admin'), deletePrescription);

module.exports = router;
