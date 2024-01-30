// server.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth"); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 3001;

// Start Apollo Server function
async function startApolloServer() {
  // Initialize Apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware, // Make sure authMiddleware is properly structured for GraphQL context
  });

  try {
    // Start Apollo server
    await server.start();

    // Express middleware for JSON and URL-encoded data should be placed before any route handling
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Apply Apollo GraphQL middleware and set the path to /graphql
    server.applyMiddleware({ app, path: "/graphql" }); // Explicitly set the path to prevent any future confusion

    // Serve static files in production environment
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../client/build")));

      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
      });
    }

    // Connect to the database before starting the Express server
    await db.once("open", () => {
      app.listen(PORT, () => {
        console.log(`🌍 Now listening on localhost:${PORT}`);
        console.log(
          `GraphQL available at http://localhost:${PORT}${server.graphqlPath}`
        );
      });
    });
  } catch (e) {
    // Enhanced error handling
    console.error("Apollo Server and Express app failed to start", e);
    process.exit(1); // Exit the process with a failure code
  }
}

// Call the function to start the Apollo Server
startApolloServer();
