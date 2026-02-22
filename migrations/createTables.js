// createTables.js
// Run this file ONCE to set up your database tables
// Like building the shelves before stocking them 🪣

const pool = require('../db');

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id        SERIAL PRIMARY KEY,
      name      VARCHAR(100) NOT NULL,
      email     VARCHAR(100) UNIQUE NOT NULL,
      age       INT CHECK (age > 0 AND age < 120),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  // SERIAL      → auto-incrementing number (1, 2, 3...)
  // PRIMARY KEY → unique identifier for each row
  // NOT NULL    → this field is required
  // UNIQUE      → no two users can have the same email
  // CHECK       → validates age is a reasonable number
  // DEFAULT     → auto-fills created_at with current time

  try {
    await pool.query(query);
    console.log('Users table created successfully!');
  } catch (err) {
    console.error('Error creating users table:', err.message);
  } finally {
    pool.end(); // close the connection after we're done
  }
};

createUsersTable();