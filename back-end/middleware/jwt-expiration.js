const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

// Middleware function to validate the token expiration
const validateToken = (req, res, next) => {
  // Get the token from the request headers, query parameters, or body
  const { token } = req.params;
  if (!token) {
    return next(createError(401, "Token not provided"));
  }

  // Verify the token and check its expiration
  jwt.verify(token, "supersecret_dont_share", (err, decodedToken) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }

    // Token is valid, you can access the decoded token's information if needed
    req.email = decodedToken.email; // assuming the token contains a 'email' field

    // Move to the next middleware or route handler
    next();
  });
};

// Example usage of the middleware
app.get("/protected-route", validateToken, (req, res) => {
  // The token is valid and not expired
  // Access the user information from req.user if needed
  res.json({ message: "Access granted to protected route" });
});
