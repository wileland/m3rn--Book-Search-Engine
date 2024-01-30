const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../../models");
const { signToken } = require("../../utils/auth");

const resolvers = {
  Query: {
    // Resolver for the 'me' query to get the logged-in user's data
    me: async (parent, args, context) => {
      // Check if the user is in the context (logged in)
      if (context.user) {
        try {
          // Fetch the user information, excluding the password, and populate savedBooks
          const userInfo = await User.findOne({ _id: context.user._id })
            .select("-password")
            .populate("savedBooks");
          return userInfo;
        } catch (error) {
          console.error("Error fetching user data:", error);
          throw new Error("Error fetching user data.");
        }
      }
      // If no user in context, throw an authentication error
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    // Mutation for adding a new user
    addUser: async (parent, { username, email, password }) => {
      try {
        // Create a new user
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Something went wrong with user registration");
      }
    },
    // Mutation for user login
    login: async (parent, { email, password }) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
          throw new AuthenticationError("Incorrect credentials");
        }

        // Check if the provided password is correct
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        // If authentication is successful, sign and return the token along with user data
        const token = signToken(user);
        return { token, user: user.toObject({ virtuals: true }) };
      } catch (error) {
        console.error("Login error:", error);
        throw new Error("Error logging in");
      }
    },
  },
};

module.exports = resolvers;
