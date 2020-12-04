export const row = (state) => {
  return state.boardSize[0];
};

export const column = (state) => {
  return state.boardSize[1];
};

export const goal = (state) => {
  return state.winValue;
};

export const maxUndoSteps = (state) => {
  return state.maxUndoSteps;
};

export const stepsLength = (state) => {
  return state.undoSteps.length - 1;
};
