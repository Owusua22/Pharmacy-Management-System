const express = require('express');
const {
  getAllInventories,
  addInventory,
  updateInventory,
  deleteInventory,
  getInventoryByName,
} = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');
const { role } = require('../middleware/roleMiddleware');
const multer = require('multer');


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.get('/', protect, getAllInventories);
router.post('/', protect, role('admin'), upload.single('image'), addInventory);
router.get('/:name', protect, role('admin'), getInventoryByName);
router.put('/:id', protect, role('admin'), upload.single('image'), updateInventory);
router.delete('/:id', protect, role('admin'), deleteInventory);

module.exports = router;
