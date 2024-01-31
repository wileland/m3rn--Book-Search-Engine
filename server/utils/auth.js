const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

const secret = process.env.JWT_SECRET || "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  // Middleware for decoding JWT tokens
  authMiddleware: function ({ req }) {
    // Allow token to be sent via req.query or headers
    let token = req.query.token || req.headers.authorization;

    // Split the token string on spaces and get the actual token
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // If no token, return request object as is
    if (!token) {
      return req;
    }

    try {
      // Decode and attach user data to the request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (error) {
      console.error("Invalid token", error);
      // Optionally, you can throw an AuthenticationError here if you want to deny the request
    }

    // Return the updated request object
    return req;
  },

  // Function for signing JWT tokens
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    // Sign the token with the user payload and expiration
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
