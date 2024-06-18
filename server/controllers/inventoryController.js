const Inventory = require('../models/inventory');

exports.getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find();
    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInventoryByName = async (req, res) => {
  const { name } = req.params;
  try {
    const inventory = await Inventory.findOne({ name });
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addInventory = async (req, res) => {
  const { name, quantity, supplier, expirationDate, amount } = req.body;
  const fileName = req.file ? req.file.filename : null;
 

  try {
    const newInventory = new Inventory({ name, quantity, supplier, expirationDate, amount, fileName });
    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateInventory = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, supplier, expirationDate, amount } = req.body;
  const fileName = req.file ? req.file.filename : null;

  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(
      id,
      { name, quantity, supplier, expirationDate, amount, fileName },
      { new: true }
    );
    if (!updatedInventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteInventory = async (req, res) => {
  const { id } = req.params;
  try {
    await Inventory.findByIdAndDelete(id);
    res.status(200).json({ message: 'Inventory deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
