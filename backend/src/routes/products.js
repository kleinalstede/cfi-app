const express = require('express');
const pool = require('../config/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produkt nicht gefunden' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create product (Admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const result = await pool.query(
      'INSERT INTO products (name, description, price, stock, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, stock, category]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, category = $5 WHERE id = $6 RETURNING *',
      [name, description, price, stock, category, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produkt nicht gefunden' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produkt nicht gefunden' });
    }

    res.json({ message: 'Produkt gelöscht' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;