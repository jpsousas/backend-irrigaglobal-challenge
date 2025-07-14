// src/pivots/pivot.service.js
import { pivots } from "../data/inMemoryDB.js"; // Importação nomeada e com '.js'
import { generateUUID } from "../utils/uuid.js"; // Importação nomeada e com '.js'

const getPivotsByUserId = (userId) => {
  return pivots.filter((pivot) => pivot.userId === userId);
};

const getPivotById = (pivotId, userId) => {
  return pivots.find(
    (pivot) => pivot.id === pivotId && pivot.userId === userId
  );
};

const createPivot = ({
  description,
  flowRate,
  minApplicationDepth,
  userId,
}) => {
  const newPivot = {
    id: generateUUID(),
    description,
    flowRate,
    minApplicationDepth,
    userId,
  };
  pivots.push(newPivot);
  return newPivot;
};

const updatePivot = (pivotId, userId, updates) => {
  const pivotIndex = pivots.findIndex(
    (pivot) => pivot.id === pivotId && pivot.userId === userId
  );
  if (pivotIndex === -1) {
    return null;
  }
  const updatedPivot = { ...pivots[pivotIndex], ...updates };
  pivots[pivotIndex] = updatedPivot;
  return updatedPivot;
};

const deletePivot = (pivotId, userId) => {
  const pivotIndex = pivots.findIndex(
    (pivot) => pivot.id === pivotId && pivot.userId === userId
  );
  if (pivotIndex === -1) {
    return false; // Pivô não encontrado ou não autorizado
  }
  pivots.splice(pivotIndex, 1); // <--- ESTA É A LINHA CORRIGIDA
  return true; // Exclusão bem-sucedida
};

export {
  // Usando 'export' nomeado
  getPivotsByUserId,
  getPivotById,
  createPivot,
  updatePivot,
  deletePivot,
};
