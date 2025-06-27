const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // Attach user ID to request
    console.log("JWT DECODED:", decoded);
    next();
  } catch (err) {
    console.log("JWT ERROR:", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
