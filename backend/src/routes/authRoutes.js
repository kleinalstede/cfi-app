
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');  // Deine DB-Connection (stelle sicher, dass config/db.js existiert)

const router = express.Router();

// POST /register (bestehender Code, leicht verbessert)
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Register request received:', { name, email });  // Logge Request-Daten

  // Grundlegende Validierung
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    // Checke JWT_SECRET (aus .env)
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not defined in .env');
    }

    // Überprüfe, ob Email bereits existiert
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hashe Passwort
    const hashedPassword = await bcrypt.hash(password, 10);

    // DB-Insert
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, hashedPassword]
    );

    // Generiere Token
    const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Register Error:', err.stack);  // Detaillierter Log mit Stacktrace
    res.status(500).json({ message: 'Error registering user: ' + err.message });
  }
});

// POST /login (neu hinzugefügt, um Tokens zu generieren)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received:', { email });

  // Grundlegende Validierung
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Checke JWT_SECRET (aus .env)
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not defined in .env');
    }

    // Finde User
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Vergleiche Passwort
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generiere Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err.stack);
    res.status(500).json({ message: 'Error logging in: ' + err.message });
  }
});

module.exports = router;
