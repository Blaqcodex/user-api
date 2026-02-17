// routes/userRoutes.js

const express = require('express');

// express.Router() creates a mini-application that handles routes
const router = express.Router();

// Import all controller functions
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// Define routes and map them to controller functions
// The path here is relative to wherever this router is mounted in index.js
router.get('/', getAllUsers);           // GET /users
router.get('/:id', getUserById);        // GET /users/:id
router.post('/', createUser);           // POST /users
router.put('/:id', updateUser);         // PUT /users/:id
router.delete('/:id', deleteUser);      // DELETE /users/:id

module.exports = router;