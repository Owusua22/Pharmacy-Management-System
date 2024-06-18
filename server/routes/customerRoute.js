// server/routes/customers.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');
const { role } = require('../middleware/roleMiddleware');

router.get('/', customerController.getAllCustomers, protect, role('admin'));
router.get('/:name', customerController.getCustomerByName, protect, role('admin')); // New route
router.post('/', customerController.addCustomer, protect, role('admin'));
router.put('/:id', customerController.updateCustomer, protect, role('admin'));
router.delete('/:id', customerController.deleteCustomer, protect, role('admin'),);

module.exports = router;
