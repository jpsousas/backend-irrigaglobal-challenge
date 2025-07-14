import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "chave_secreta";
const JWT_EXPIRES_IN = "1h";

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export { generateToken, verifyToken };
