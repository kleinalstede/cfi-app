const pool = require('./config/db');

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS instruments (
        id SERIAL PRIMARY KEY,
        art VARCHAR(50) NOT NULL CHECK (art IN ('Violin', 'Viola', 'Cello')),
        seriennummer VARCHAR(100) UNIQUE NOT NULL,
        anzahl_saiten VARCHAR(10) NOT NULL CHECK (anzahl_saiten IN ('4', '5', '6')),
        kaufjahr INTEGER NOT NULL,
        kaufort VARCHAR(255) NOT NULL,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabelle instruments erstellt oder existiert bereits');
  } catch (error) {
    console.error('Fehler beim Erstellen der Tabelle:', error);
  } finally {
    pool.end();  // Schließt die Connection
  }
};

createTable();