const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const salesRoutes = require('./routes/salesRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const customerRoutes = require('./routes/customerRoute');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

// Use CORS middleware
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
