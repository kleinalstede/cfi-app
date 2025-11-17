const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/instruments', require('./routes/instrumentsRoutes'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running' });
});

// Root Route
app.get('/', (req, res) => {
  res.json({ message: 'CFI App Backend läuft!' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});