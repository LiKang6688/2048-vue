export const row = (state) => {
  return state.boardSize[0];
};

export const column = (state) => {
  return state.boardSize[1];
};

export const goal = (state) => {
  return state.winValue;
};

export const stepsLength = (state) => {
  return state.steps.length - 1;
};
