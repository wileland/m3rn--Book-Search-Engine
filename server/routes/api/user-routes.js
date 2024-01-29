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

// Routes for user-related operations
router.route("/").post(createUser).put(authMiddleware, saveBook);

router.route("/login").post(login);

router.route("/me").get(authMiddleware, getSingleUser);

router.route("/books/:bookId").delete(authMiddleware, deleteBook);

module.exports = router;
