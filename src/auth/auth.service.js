// src/auth/auth.service.js
import { users } from "../data/inMemoryDB.js"; // Importação nomeada e com '.js'
import { hashPassword, comparePassword } from "../utils/bcrypt.js"; // Importação nomeada e com '.js'
import { generateToken } from "../utils/jwt.js"; // Importação nomeada e com '.js'
import { generateUUID } from "../utils/uuid.js"; // Importação nomeada e com '.js'

const registerUser = (username, password) => {
  if (!username || !password) {
    throw new Error("Username and password are required.");
  }
  if (users.find((user) => user.username === username)) {
    throw new Error("Username already exists.");
  }

  const hashedPassword = hashPassword(password);
  const newUser = { id: generateUUID(), username, password: hashedPassword };
  users.push(newUser);
  return { id: newUser.id, username: newUser.username };
};

const loginUser = (username, password) => {
  const user = users.find((user) => user.username === username);
  if (!user) {
    throw new Error("Invalid credentials.");
  }

  const isPasswordValid = comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials.");
  }

  const token = generateToken({ id: user.id, username: user.username });
  return token;
};

export {
  // Usando 'export' nomeado
  registerUser,
  loginUser,
};
