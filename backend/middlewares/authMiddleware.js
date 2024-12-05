const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.SECRETE_KEY);

      // Find the user and exclude the password
      req.user = await User.findById(decoded.id).select("-password");

      // Pass control to the next middleware
      return next();
    } catch (error) {
      // Handle invalid token errors
      console.error("Token verification failed:", error.message);
      return res.status(401).send("Not authorized, token failed");
    }
  }

  // Handle missing tokens
  if (!token) {
    return res.status(401).send("Not authorized, no token provided");
  }
};

module.exports = protect;
