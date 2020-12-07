export const row = (state) => {
  return state.boardSize[0];
};

export const column = (state) => {
  return state.boardSize[1];
};

export const goal = (state) => {
  return state.winTileValue;
};

export const maxUndoStepsAmount = (state) => {
  return state.maxUndoStepsAmount;
};

export const undoStepsLength = (state) => {
  return state.undoSteps.length - 1;
};
