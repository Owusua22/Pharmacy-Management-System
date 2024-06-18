const Sales = require('../models/Sales');

// Get all sales
exports.getSales = async (req, res) => {
  try {
    const sales = await Sales.find({});
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new sale
exports.addSale = async (req, res) => {
  const { customerName, items, totalAmount, date } = req.body;
  try {
    const newSale = new Sales({ customerName, items, totalAmount, date });
    await newSale.save();
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a sale
exports.updateSale = async (req, res) => {
  const { customerName, items, totalAmount, date } = req.body;
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    sale.customerName = customerName || sale.customerName;
    sale.items = items || sale.items;
    sale.totalAmount = totalAmount || sale.totalAmount;
    sale.date = date || sale.date;

    const updatedSale = await sale.save();
    res.json(updatedSale);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a sale

exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Sales not found' });
    }

    await sale.deleteOne();
    res.json({ message: 'Sales deleted' });
  } catch (error) {
    console.error('Error deleting sales:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

