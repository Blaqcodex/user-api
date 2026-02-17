// index.js

const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the user routes under the /users path
// This means all routes in userRoutes.js will start with /users
app.use('/users', userRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'User API is running!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});