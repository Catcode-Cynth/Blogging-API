const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  try {
    // Check if Authorization header exists and starts with Bearer
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      return res.status(401).json({
        error: "Access denied. No token provided.",
      });
    }

    // Extract token
    const token = req.headers.authorization.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token. Please login again.",
    });
  }
};


module.exports = (req, res, next) => {
  try {
    // Check if Authorization header exists and starts with Bearer
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      return res.status(401).json({
        error: "Access denied. No token provided.",
      });
    }

    // Extract token
    const token = req.headers.authorization.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token. Please login again.",
    });
  }
};

