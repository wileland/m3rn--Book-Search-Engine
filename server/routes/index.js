const router = require("express").Router();
const path = require("path");
const apiRoutes = require("./api");

// API routes
router.use("/api", apiRoutes);

// Serve the React front-end in production
router.use((req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  } catch (error) {
    // Handle errors or log them
    next(error);
  }
});

module.exports = router;
