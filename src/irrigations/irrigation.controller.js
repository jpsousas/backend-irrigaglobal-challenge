import * as irrigationService from "./irrigation.service.js";

const listIrrigations = (req, res) => {
  try {
    const userId = req.user.id;
    const irrigations = irrigationService.getIrrigationsByUserId(userId);
    if (irrigations.length === 0) {
      return res.status(404).json({ message: "No irrigation records found." });
    }
    res.status(200).json(irrigations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getIrrigationById = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const irrigation = irrigationService.getIrrigationById(id, userId);
    if (!irrigation) {
      return res
        .status(404)
        .json({ message: "Irrigation record not found or unauthorized." });
    }
    res.status(200).json(irrigation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createIrrigation = (req, res) => {
  try {
    const { pivotId, applicationAmount, irrigationDate } = req.body;
    const userId = req.user.id;

    if (!pivotId || typeof applicationAmount !== "number" || !irrigationDate) {
      return res.status(400).json({
        message:
          "Missing or invalid required fields: pivotId (UUID), applicationAmount (number), or irrigationDate (string).",
      });
    }

    const newIrrigation = irrigationService.createIrrigation({
      pivotId,
      applicationAmount,
      irrigationDate,
      userId,
    });
    res.status(201).json({
      message: "Irrigation record created successfully!",
      irrigation: newIrrigation,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteIrrigation = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deleted = irrigationService.deleteIrrigation(id, userId);
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Irrigation record not found or unauthorized." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  listIrrigations,
  getIrrigationById,
  createIrrigation,
  deleteIrrigation,
};
