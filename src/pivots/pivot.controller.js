import * as pivotService from "./pivot.service.js";

const listPivots = (req, res) => {
  try {
    const userId = req.user.id;
    const pivots = pivotService.getPivotsByUserId(userId);
    res.status(200).json(pivots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPivotById = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const pivot = pivotService.getPivotById(id, userId);
    if (!pivot) {
      return res
        .status(404)
        .json({ message: "Pivot not found or unauthorized." });
    }
    res.status(200).json(pivot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPivot = (req, res) => {
  try {
    const { description, flowRate, minApplicationDepth } = req.body;
    const userId = req.user.id;

    if (
      !description ||
      typeof flowRate !== "number" ||
      typeof minApplicationDepth !== "number"
    ) {
      return res.status(400).json({
        message:
          "Missing or invalid required fields: description (string), flowRate (number), or minApplicationDepth (number).",
      });
    }

    const newPivot = pivotService.createPivot({
      description,
      flowRate,
      minApplicationDepth,
      userId,
    });
    res
      .status(201)
      .json({ message: "Pivot created successfully!", pivot: newPivot });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePivot = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No update data provided." });
    }

    const updatedPivot = pivotService.updatePivot(id, userId, updates);
    if (!updatedPivot) {
      return res
        .status(404)
        .json({ message: "Pivot not found or unauthorized." });
    }
    res
      .status(200)
      .json({ message: "Pivot updated successfully!", pivot: updatedPivot });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePivot = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deleted = pivotService.deletePivot(id, userId);
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Pivot not found or unauthorized." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { listPivots, getPivotById, createPivot, updatePivot, deletePivot };
