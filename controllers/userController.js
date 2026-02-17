// controllers/userController.js

// In-memory "database" — an array that stores all our users
let users = [];

// A counter to assign unique IDs to each user
let nextId = 1;

// ─────────────────────────────────────────────
// GET /users — Return all users
// ─────────────────────────────────────────────
const getAllUsers = (req, res) => {
  res.status(200).json(users);
};

// ─────────────────────────────────────────────
// GET /users/:id — Return a single user by ID
// ─────────────────────────────────────────────
const getUserById = (req, res) => {
  // req.params.id comes from the URL (e.g. /users/3)
  // It's a string, so we convert it to a number with parseInt
  const id = parseInt(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    // 404 means "Not Found"
    return res.status(404).json({ message: `User with ID ${id} not found` });
  }

  res.status(200).json(user);
};

// ─────────────────────────────────────────────
// POST /users — Create a new user
// ─────────────────────────────────────────────
const createUser = (req, res) => {
  // req.body contains the JSON data sent by the client
  const { name, email, age } = req.body;

  // Basic validation — make sure required fields are present
  if (!name || !email || !age) {
    // 400 means "Bad Request" — the client sent incomplete data
    return res.status(400).json({ message: 'name, email, and age are all required' });
  }

  // Build the new user object
  const newUser = {
    id: nextId++,  // assign current ID then increment the counter
    name,
    email,
    age: Number(age), // ensure age is stored as a number
  };

  // Add the new user to our array
  users.push(newUser);

  // 201 means "Created" — the standard success code for POST
  res.status(201).json(newUser);
};

// ─────────────────────────────────────────────
// PUT /users/:id — Update an existing user
// ─────────────────────────────────────────────
const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, age } = req.body;

  // Find the index of the user in the array
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: `User with ID ${id} not found` });
  }

  // Update the fields — only replace fields that were actually sent
  users[userIndex] = {
    ...users[userIndex],         // keep existing fields
    ...(name && { name }),       // overwrite name only if provided
    ...(email && { email }),     // overwrite email only if provided
    ...(age && { age: Number(age) }), // overwrite age only if provided
  };

  res.status(200).json(users[userIndex]);
};

// ─────────────────────────────────────────────
// DELETE /users/:id — Delete a user
// ─────────────────────────────────────────────
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: `User with ID ${id} not found` });
  }

  // Remove the user from the array
  users.splice(userIndex, 1);

  // 200 with a confirmation message
  res.status(200).json({ message: `User with ID ${id} has been deleted` });
};

// Export all controller functions so other files can use them
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};