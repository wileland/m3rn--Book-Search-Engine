const router = require("express").Router();
const userRoutes = require("./user-routes");

// User routes
router.use("/users", userRoutes);

module.exports = router;
