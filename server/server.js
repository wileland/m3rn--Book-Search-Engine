// server.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schema");
const jwt = require("jsonwebtoken");
const routes = require("./routes"); // Assuming you have an 'index.js' in your 'routes' folder which exports all routes

// Place your JWT secret key here, it should be the same used to sign the tokens
const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = (req) => {
  let token = req.headers.authorization || "";
  token = token.split(" ").pop().trim();

  let user = null;

  if (token) {
    try {
      user = jwt.verify(token, SECRET_KEY);
    } catch {
      // Optionally, you could log the error or handle it if necessary
      console.log("Invalid or expired token");
    }
  }

  return { user };
};

async function startApolloServer() {
  const app = express();
  const PORT = process.env.PORT || 3001;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => authMiddleware(req),
  });

  await server.start();

  // Middleware for parsing JSON and urlencoded form data
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve up static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  // Use the Apollo server middleware
  server.applyMiddleware({ app });

  // Use routes from the routes directory
  app.use(routes);

  // Serve the React front-end in production
  if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(
        `GraphQL available at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
}

startApolloServer();
