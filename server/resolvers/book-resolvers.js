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
        const book = await Book.create({
          ...input,
          username: context.user.username,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { books: book._id } }
        );
        return book;
      }

      throw new AuthenticationError("You need to be logged in to add a book.");
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const book = await Book.findOneAndDelete({
          _id: bookId,
          username: context.user.username,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { books: bookId } }
        );
        return book;
      }

      throw new AuthenticationError(
        "You need to be logged in to remove a book."
      );
    },
  },
};

module.exports = resolvers;
