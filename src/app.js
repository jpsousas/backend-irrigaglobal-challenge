import express from "express";
import authRoutes from "./auth/auth.routes.js";
import pivotRoutes from "./pivots/pivot.routes.js";
import irrigationRoutes from "./irrigations/irrigation.routes.js";

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
