
const express = require('express');
const pool = require('../config/db');
const authMiddleware = require('../middleware/auth');  // Schützt alle Routes

const router = express.Router();

// GET all instruments for the current user (geschützt)
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query('SELECT * FROM instruments WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching instruments:', err.stack);
    res.status(500).json({ message: 'Error fetching instruments: ' + err.message });
  }
});

// GET single instrument by ID (geschützt, nur eigenes)
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const result = await pool.query('SELECT * FROM instruments WHERE id = $1 AND user_id = $2', [id, userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Instrument not found or not authorized' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching instrument:', err.stack);
    res.status(500).json({ message: 'Error fetching instrument: ' + err.message });
  }
});

// POST create new instrument (geschützt, setzt user_id automatisch)
router.post('/', authMiddleware, async (req, res) => {
  const { art, seriennummer, anzahl_saiten, kaufjahr, kaufort } = req.body;
  const userId = req.user.id;

  // Grundlegende Validierung (DB-Constraints handhaben den Rest)
  if (!art || !seriennummer || !anzahl_saiten || !kaufjahr || !kaufort) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO instruments (art, seriennummer, anzahl_saiten, kaufjahr, kaufort, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [art, seriennummer, anzahl_saiten, kaufjahr, kaufort, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating instrument:', err.stack);
    if (err.code === '23505') {  // Unique violation (z. B. seriennummer)
      return res.status(409).json({ message: 'Seriennummer already exists' });
    }
    res.status(500).json({ message: 'Error creating instrument: ' + err.message });
  }
});

// PUT update instrument by ID (geschützt, nur eigenes)
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { art, seriennummer, anzahl_saiten, kaufjahr, kaufort } = req.body;
  const userId = req.user.id;

  try {
    // Zuerst überprüfen, ob es dem User gehört
    const checkResult = await pool.query('SELECT * FROM instruments WHERE id = $1 AND user_id = $2', [id, userId]);
    if (checkResult.rows.length === 0) {
      return res.status(403).json({ message: 'Not authorized to update this instrument' });
    }

    const result = await pool.query(
      'UPDATE instruments SET art = $1, seriennummer = $2, anzahl_saiten = $3, kaufjahr = $4, kaufort = $5 WHERE id = $6 RETURNING *',
      [art, seriennummer, anzahl_saiten, kaufjahr, kaufort, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating instrument:', err.stack);
    if (err.code === '23505') {  // Unique violation
      return res.status(409).json({ message: 'Seriennummer already exists' });
    }
    res.status(500).json({ message: 'Error updating instrument: ' + err.message });
  }
});

// DELETE instrument by ID (geschützt, nur eigenes)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const result = await pool.query('DELETE FROM instruments WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Instrument not found or not authorized' });
    }
    res.json({ message: 'Instrument deleted' });
  } catch (err) {
    console.error('Error deleting instrument:', err.stack);
    res.status(500).json({ message: 'Error deleting instrument: ' + err.message });
  }
});

module.exports = router;
