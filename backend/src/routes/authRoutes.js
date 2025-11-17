const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');  // Deine DB-Connection (stelle sicher, dass config/db.js existiert)

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Register request received:', { name, email });  // Logge Request-Daten

  try {
    // Checke JWT_SECRET (aus .env)
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not defined in .env');
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

