const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "mysecretsshhhhh";
const expiration = process.env.JWT_EXPIRATION || "2h";

module.exports = {
  // Updated middleware to work with the GraphQL context
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
    } catch {
      // If there's a problem with the token, leave the request object unchanged
      console.error("Invalid token");
    }

    // Return the updated request object
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    // Sign the token with the user payload and expiration
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
