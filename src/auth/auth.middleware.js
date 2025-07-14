// src/auth/auth.middleware.js
import { verifyToken } from "../utils/jwt.js"; // Importação nomeada e com '.js'

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
};

export default authenticateToken; // Usando 'export default' para o middleware
