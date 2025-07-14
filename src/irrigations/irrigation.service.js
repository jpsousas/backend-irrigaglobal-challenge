import { irrigations } from "../data/inMemoryDB.js";
import { generateUUID } from "../utils/uuid.js";
import { getPivotById } from "../pivots/pivot.service.js";

const getIrrigationsByUserId = (userId) => {
  return irrigations.filter((irrigation) => irrigation.userId === userId);
};

const getIrrigationById = (irrigationId, userId) => {
  return irrigations.find(
    (irrigation) =>
      irrigation.id === irrigationId && irrigation.userId === userId
  );
};

const createIrrigation = ({
  pivotId,
  applicationAmount,
  irrigationDate,
  userId,
}) => {
  const pivotExistsAndBelongsToUser = getPivotById(pivotId, userId);
  if (!pivotExistsAndBelongsToUser) {
    throw new Error(
      "Pivot not found or does not belong to the authenticated user."
    );
  }

  const newIrrigation = {
    id: generateUUID(),
    pivotId,
    applicationAmount,
    irrigationDate,
    userId,
  };
  irrigations.push(newIrrigation);
  return newIrrigation;
};

const deleteIrrigation = (irrigationId, userId) => {
  const irrigationIndex = irrigations.findIndex(
    (irrigation) =>
      irrigation.id === irrigationId && irrigation.userId === userId
  );
  if (irrigationIndex === -1) {
    return false;
  }
  irrigations.splice(irrigationIndex, 1);
  return true;
};

export {
  getIrrigationsByUserId,
  getIrrigationById,
  createIrrigation,
  deleteIrrigation,
};
