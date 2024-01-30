const typeDefs = require("./typeDefs");
const userResolvers = require("./resolvers/user-resolvers");
const bookResolvers = require("./resolvers/book-resolvers");

// Combine user and book resolvers into a single object
const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...bookResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...bookResolvers.Mutation,
  },
  // Add other resolver types if they exist, such as Subscription
};

module.exports = { typeDefs, resolvers };
