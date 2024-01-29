const { gql } = require("apollo-server-express");

// Define your GraphQL schema using GraphQL's schema definition language (SDL)
const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    books: [Book]!
  }

  type Book {
    _id: ID
    title: String!
    authors: [String]!
    description: String
    image: String
    link: String
    username: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    title: String!
    authors: [String]!
    description: String
    image: String
    link: String
  }

  type Query {
    me: User
    users: [User]
    books(username: String): [Book]
    book(bookId: ID!): Book
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(input: BookInput!): Book
    removeBook(bookId: ID!): Book
  }
`;

module.exports = typeDefs;
