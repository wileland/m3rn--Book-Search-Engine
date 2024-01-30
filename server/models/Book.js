const { Schema } = require("mongoose");

const bookSchema = new Schema(
  {
    authors: [String],
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    bookId: {
      type: String,
      required: [true, "Book ID is required"],
      unique: true, // Ensure bookId is unique
    },
    image: {
      type: String,
      // Optional: Add URL validation for image
    },
    link: {
      type: String,
      // Optional: Add URL validation for link
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

module.exports = bookSchema;
