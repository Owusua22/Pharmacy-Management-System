const express = require('express');
const { getSales, addSale, updateSale, deleteSale } = require('../controllers/salesController');
const { protect,  } = require('../middleware/authMiddleware');
const { role } = require('../middleware/roleMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getSales)
  .post(protect, role('admin'), addSale);

router.route('/:id')
  .put(protect, role('admin'), updateSale)
  .delete(protect, role('admin'), deleteSale);

module.exports = router;
