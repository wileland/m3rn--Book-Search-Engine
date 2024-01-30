const mongoose = require("mongoose");

// Define the MongoDB connection string from the environment variable
const mongoDBUri =
  process.env.DB_URI || "mongodb://127.0.0.1:27017/BookSearchEngine";

mongoose
  .connect(mongoDBUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((err) => {
    console.error("Connection error", err.message);
  });

// Export the connection
module.exports = mongoose.connection;
