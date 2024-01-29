const express = require("express");
const path = require("path");
const db = require("./config/connection"); // Assuming you have a database connection file
const routes = require("./routes"); // Assuming you have defined your routes

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Serve the static files from the client/build directory
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Use your defined routes
app.use(routes);

// Database connection
db.once("open", () => {
  console.log("Connected to the database");
  // Start the server once the database is connected
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
  });
});
