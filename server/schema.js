const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const userResolvers = require("./resolvers/user-resolvers");
const bookResolvers = require("./resolvers/book-resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers: [userResolvers, bookResolvers],
});

module.exports = server;
