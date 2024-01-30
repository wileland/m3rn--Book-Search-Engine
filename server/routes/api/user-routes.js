// user-routes.js
const router = require("express").Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require("../../controllers/user-controller");

// Import middleware
const { authMiddleware } = require("../../utils/auth");

// POST route to create a new user
router.post("/", (req, res, next) => {
  createUser(req)
    .then((user) => res.json(user))
    .catch(next);
});

// PUT route to save a book to a user's 'savedBooks'
router.put("/", authMiddleware, (req, res, next) => {
  saveBook(req)
    .then((user) => res.json(user))
    .catch(next);
});

// POST route for user to login
router.post("/login", (req, res, next) => {
  login(req)
    .then((user) => res.json(user))
    .catch(next);
});

// GET route to retrieve the logged-in user's data
router.get("/me", authMiddleware, (req, res, next) => {
  getSingleUser(req)
    .then((user) => res.json(user))
    .catch(next);
});

// DELETE route to remove a book from a user's 'savedBooks'
router.delete("/books/:bookId", authMiddleware, (req, res, next) => {
  deleteBook(req)
    .then((user) => res.json(user))
    .catch(next);
});

module.exports = router;
