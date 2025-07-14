import express from "express";
import * as pivotController from "./pivot.controller.js";
import authenticateToken from "../auth/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, pivotController.listPivots);
router.get("/:id", authenticateToken, pivotController.getPivotById);
router.post("/", authenticateToken, pivotController.createPivot);
router.put("/:id", authenticateToken, pivotController.updatePivot);
router.delete("/:id", authenticateToken, pivotController.deletePivot);

export default router;
