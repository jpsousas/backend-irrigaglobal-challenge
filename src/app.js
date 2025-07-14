// src/app.js
import express from "express"; // Importação default
import authRoutes from "./auth/auth.routes.js"; // Importação default e com '.js'
import pivotRoutes from "./pivots/pivot.routes.js"; // Importação default e com '.js'
import irrigationRoutes from "./irrigations/irrigation.routes.js"; // Importação default e com '.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/pivots", pivotRoutes);
app.use("/irrigations", irrigationRoutes);

app.get("/", (req, res) => {
  res.send("API de Gerenciamento de Irrigação rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
