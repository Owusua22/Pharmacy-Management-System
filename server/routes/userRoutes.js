const express = require('express');
const { registerUser, loginUser, updateUser, deleteUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { role } = require('../middleware/roleMiddleware'); // Correctly import role

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, role('admin'), deleteUser);

module.exports = router;
