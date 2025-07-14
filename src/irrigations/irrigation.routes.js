import express from "express";
import * as irrigationController from "./irrigation.controller.js";
import authenticateToken from "../auth/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, irrigationController.listIrrigations);
router.get("/:id", authenticateToken, irrigationController.getIrrigationById);
router.post("/", authenticateToken, irrigationController.createIrrigation);
router.delete("/:id", authenticateToken, irrigationController.deleteIrrigation);

export default router;
