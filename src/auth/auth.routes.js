// src/auth/auth.routes.js
import express from "express"; // Importação default para express
import { register, login } from "./auth.controller.js"; // Importação nomeada e com '.js'

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router; // Usando 'export default' para o router
