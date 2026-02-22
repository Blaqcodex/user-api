// routes/users.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // our database connection

// ─────────────────────────────────────────
// GET /users Fetch ALL users
// ─────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users ORDER BY created_at DESC'
    );
    // result.rows is an array of user objects
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─────────────────────────────────────────
// GET /users/:id Fetch ONE user by ID
// ─────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // This PREVENTS SQL injection attacks! 
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1', 
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: `User with id ${id} not found` 
      });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─────────────────────────────────────────
// POST /users → Create a NEW user
// ─────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Basic validation
    if (!name || !email || !age) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide name, email, and age' 
      });
    }

    // RETURNING * → gives us back the newly created row
    const result = await pool.query(
      'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
      [name, email, age]
    );

    res.status(201).json({ 
      success: true, 
      message: 'User created!',
      data: result.rows[0] 
    });
  } catch (err) {
    // Handle duplicate email error from PostgreSQL
    if (err.code === '23505') {
      return res.status(409).json({ 
        success: false, 
        message: 'Email already exists' 
      });
    }
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─────────────────────────────────────────
// PUT /users/:id → Update an existing user
// ─────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    const result = await pool.query(
      `UPDATE users 
       SET name = $1, email = $2, age = $3 
       WHERE id = $4 
       RETURNING *`,
      [name, email, age, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: `User with id ${id} not found` 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'User updated!',
      data: result.rows[0] 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─────────────────────────────────────────
// DELETE /users/:id Remove a user
// ─────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: `User with id ${id} not found` 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: `User ${id} deleted successfully` 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;