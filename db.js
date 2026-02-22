// db.js
// This file creates ONE reusable connection to our database
// Think of it like a phone line we keep open to the DB

require('dotenv').config();
const { Pool } = require('pg');

// A "Pool" manages multiple connections efficiently
// Instead of opening/closing a connection every request, 
// it keeps a pool of ready connections ♻️
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Test the connection when the server starts
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Successfully connected to PostgreSQL database!');
    release(); // release the client back to the pool
  }
});

// We export pool so any file can use it to run queries
module.exports = pool;