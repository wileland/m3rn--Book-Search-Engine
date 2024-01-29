const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "mysecretsshhhhh";
const expiration = process.env.JWT_EXPIRATION || "2h";

module.exports = {
  authMiddleware: function (req, res, next) {
    let token = req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided." });
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      next();
    } catch (error) {
      console.error("Invalid token:", error.message);
      return res.status(401).json({ message: "Unauthorized: Invalid token." });
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
