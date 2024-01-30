const { User } = require("../models");
const { signToken } = require("../utils/auth");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");

const userResolvers = {
  Query: {
    // get a single user by either their id or their username
    getSingleUser: async (_, args, context) => {
      const { user, params } = args;
      const query = user ? { _id: user._id } : { username: params.username };
      const foundUser = await User.findOne(query);

      if (!foundUser) {
        throw new UserInputError(
          "Cannot find a user with this id or username!"
        );
      }

      return foundUser;
    },
  },
  Mutation: {
    // create a user, sign a token, and return
    createUser: async (_, args) => {
      const { username, email, password } = args;
      const user = await User.create({ username, email, password });
      if (!user) {
        throw new Error("Unable to create user!");
      }
      const token = signToken(user);
      return { token, user };
    },

    // login a user, sign a token, and return
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Wrong password!");
      }
      const token = signToken(user);
      return { token, user };
    },

    // save a book to a user's `savedBooks` field
    saveBook: async (_, { bookData }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }

      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        throw new Error("Error saving book");
      }
    },

    // remove a book from `savedBooks`
    removeBook: async (_, { bookId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new Error("Couldn't find user with this id!");
      }
      return updatedUser;
    },
  },
};

module.exports = userResolvers;
