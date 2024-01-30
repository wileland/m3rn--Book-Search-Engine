// server.js
require("dotenv").config(); // Ensure you load environment variables
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth"); // Update this path if necessary

const app = express();
const PORT = process.env.PORT || 3001;

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware, // Simplified for clarity
  });

  try {
    await server.start();
    server.applyMiddleware({ app });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../client/build")));
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
      });
    }

    await db.once("open", () => {
      app.listen(PORT, () => {
        console.log(`🌍 Now listening on localhost:${PORT}`);
        console.log(
          `GraphQL available at http://localhost:${PORT}${server.graphqlPath}`
        );
      });
    });
  } catch (e) {
    console.error("Apollo Server Error", e);
  }
}

startApolloServer();
