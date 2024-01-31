const { User, Book } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

// Combined resolvers
const resolvers = {
  Query: {
    // User-related Queries
    me: async (parent, args, context) => {
      if (context.user) {
        try {
          const userInfo = await User.findOne({ _id: context.user._id })
            .select("-password")
            .populate("savedBooks");
          return userInfo;
        } catch (error) {
          console.error("Error fetching user data:", error);
          throw new Error("Error fetching user data.");
        }
      }
      throw new AuthenticationError("Not logged in");
    },
    // Book-related Queries
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params).sort({ createdAt: -1 });
    },
    book: async (parent, { bookId }) => {
      return Book.findOne({ bookId });
    },
  },

  Mutation: {
    // User-related Mutations
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Something went wrong with user registration");
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
          throw new AuthenticationError("Incorrect credentials");
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }
        const token = signToken(user);
        return { token, user: user.toObject({ virtuals: true }) };
      } catch (error) {
        console.error("Login error:", error);
        throw new Error("Error logging in");
      }
    },
    // Book-related Mutations
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
        // Remove the book from the database
        await Book.findOneAndDelete({ _id: bookId });

        // Update the user's savedBooks
        const update = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: bookId } }, // Assuming bookId is the correct identifier for savedBooks
          { new: true }
        ).populate("savedBooks");

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
