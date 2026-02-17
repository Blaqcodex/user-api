// index.js

// Import the express library
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define the port our server will listen on
const PORT = 3000;

// Middleware: this tells Express to automatically parse incoming
// request bodies as JSON. Without this, req.body would be undefined.
app.use(express.json());

// A simple test route to confirm the server is running
app.get('/', (req, res) => {
  res.json({ message: 'User API is running!' });
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});