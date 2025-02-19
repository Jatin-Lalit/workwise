const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("here ios jashydajhydg", req.user);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticate;
