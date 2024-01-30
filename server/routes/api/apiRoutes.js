// apiRoutes.js
const router = require("express").Router();
const userRoutes = require("./user-routes");

// Use the userRoutes for handling all "/users" routes
router.use("/users", userRoutes);

module.exports = router;
