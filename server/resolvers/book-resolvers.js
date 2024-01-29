const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");

const resolvers = {
  Query: {
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params).sort({ createdAt: -1 });
    },
    book: async (parent, { bookId }) => {
      return Book.findOne({ bookId });
    },
  },
  Mutation: {
    addBook: async (parent, { input }, context) => {
      if (context.user) {
        const book = await Book.create({ ...input });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book._id } },
          { new: true }
        );
        return book;
      }
      throw new AuthenticationError("You need to be logged in to add a book.");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const update = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        if (!update) {
          throw new Error("Book not found or user not authorized.");
        }
        return update;
      }
      throw new AuthenticationError(
        "You need to be logged in to remove a book."
      );
    },
  },
};

module.exports = resolvers;
