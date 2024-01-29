const { Schema } = require("mongoose");

const bookSchema = new Schema({
  authors: [String],
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  bookId: {
    type: String,
    required: [true, "Book ID is required"],
  },
  image: String,
  link: String,
  title: {
    type: String,
    required: [true, "Title is required"],
  },
});

module.exports = bookSchema;
