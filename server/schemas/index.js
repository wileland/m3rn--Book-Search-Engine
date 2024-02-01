const typeDefs = require("./typeDefs");
const Resolvers = require("./resolvers");


// Combine user and book resolvers into a single object
const resolvers = {
  Query: {
    ...Resolvers.Query,
      },
  Mutation: {
     ...Resolvers.Mutation,
  },
  // Add other resolver types if they exist, such as Subscription
};

module.exports = { typeDefs, resolvers };
