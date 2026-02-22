// server.js
require('dotenv').config(); // Must be at the very top!
const express = require('express');
const app = express();

app.use(express.json()); // Parse JSON request bodies

// Routes
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'API is running with PostgreSQL!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});