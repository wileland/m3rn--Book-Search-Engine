const mongoose = require("mongoose");

const mongoDBUri =
  process.env.DB_URI || "mongodb://127.0.0.1:27017/BookSearchEngine";

// Function to connect to the database
const connectWithRetry = () => {
  mongoose
    .connect(mongoDBUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to MongoDB."))
    .catch((err) => {
      console.error("Connection error", err.message);
      console.log("Retrying connection in 5 seconds...");
      setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
    });
};

connectWithRetry();

// Graceful shutdown
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed due to app termination");
    process.exit(0);
  });
});

module.exports = mongoose.connection;
