const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  let authHeader = req.headers["authorization"]; // ✅ correct way

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }


  if (authHeader.startsWith("Bearer ")) {
    authHeader = authHeader.slice(7); 
  }

  const token = authHeader;

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; 
    next();
  });
}

module.exports = authenticateToken;
