const LOG = window._env_.LOG;

export const initialiseState = (state, playload) => {
  Object.assign(state, playload);
};

// generate a two dimensions array
export const initGrids = (state, value) => {
  const [row, column] = value;
  state.grids = Array(row)
    .fill(0)
    .map(() => Array(column).fill(0));
  LOG && window.console.log(state.grids, "grids");
};

export const occupyGrid = (state, { randomTile, randomValue }) => {
  state.grids[randomTile.x][randomTile.y] = randomValue;
  LOG && window.console.log(state.grids, "grids");
};

export const setCurrentScore = (state, value) => {
  state.stats.currentScore = value;
};

export const setTiles = (state, value) => {
  state.tiles = value;
};

export const setStatus = (state, value) => {
  state.status.gameEnd = value.gameEnd;
  state.status.win = value.win;
  state.status.gameOver = value.gameOver;
  state.status.keepGoing = value.keepGoing;
};

export const setRow = (state, value) => {
  state.boardSize.splice(0, 1, value);
};

export const setColumn = (state, value) => {
  state.boardSize.splice(1, 1, value);
};

export const setWinValue = (state, value) => {
  state.winTileValue = value;
};

export const setMaxUndoSteps = (state, value) => {
  state.maxUndoStepsAmount = value;
};

export const addNewTile = (state, { randomTile, randomValue }) => {
  state.tiles.push({
    row: randomTile.x,
    column: randomTile.y,
    value: randomValue,
  });
  LOG && window.console.log(state.tiles, "tiles");
};

export const setUndoSteps = (state, value) => {
  state.undoSteps = value;
};

export const addUndoSteps = (state) => {
  let clonedState = JSON.parse(JSON.stringify(state));
  LOG && window.console.log(clonedState, "clonedState");
  LOG && window.console.log(state.undoSteps, "undoSteps");
  state.undoSteps.push({
    tiles: clonedState.tiles,
    grids: clonedState.grids,
    stats: clonedState.stats,
    isCollided: clonedState.isCollided,
    status: clonedState.status,
  });
  LOG && window.console.log(state.undoSteps, "undoSteps");
  if (state.undoSteps.length - 1 > state.maxUndoStepsAmount)
    state.undoSteps.shift();
};

export const undo = (state) => {
  state.undoSteps.splice(-1, 1);
  LOG && window.console.log(state.undoSteps, "step");
  const clonedUndoStep = JSON.parse(
    JSON.stringify(state.undoSteps[state.undoSteps.length - 1])
  );
  state.tiles = clonedUndoStep.tiles;
  state.grids = clonedUndoStep.grids;
  state.stats = clonedUndoStep.stats;
  state.isCollided = clonedUndoStep.isCollided;
  state.status = clonedUndoStep.status;
  LOG && window.console.log(state, "state");
};

// The user's score starts at zero,
// and is increased whenever two tiles combine, by the value of the new tile.
const increaseScore = (state, value) => {
  state.stats.currentScore += value;
  if (state.stats.currentScore > state.stats.bestScore)
    state.stats.bestScore = state.stats.currentScore;
};

// get all Tiles which their value are not zero
const getFilledTiles = (state) => {
  const [row, column] = state.boardSize;
  const grids = state.grids;
  let filledTiles = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (grids[i][j] > 0) {
        filledTiles.push({
          row: i,
          column: j,
          value: grids[i][j],
        });
      }
    }
  }
  return filledTiles;
};

// two dimensions array to one dimension array
const transferGridsToTiles = (state, grids) => {
  const [row, column] = state.boardSize;
  let tiles = [];
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < column; y++) {
      if (grids[x][y] != 0)
        tiles.push({
          row: x,
          column: y,
          value: grids[x][y],
        });
    }
  }
  state.tiles = tiles;
  LOG && window.console.log(state.tiles, "tiles");
};

export const tilesSlideUp = (state) => {
  const filledTiles = getFilledTiles(state);
  LOG && window.console.log(filledTiles, "filledTiles");
  const [, column] = state.boardSize;
  let grids = state.grids;
  let lineFilledTiles = [];
  for (let i = 0; i < column; i++) {
    // for example: the first column is
    // [0,    [2,
    //  2, ->  4,
    //  0,     0,
    //  4],    0]
    // find the tiles is not 0
    lineFilledTiles = filledTiles.filter(function(item) {
      return item.column === i;
    });
    // {row: 1, column: 0, value: 2}
    // {row: 3, column: 0, value: 4}
    for (let j = 0; j < lineFilledTiles.length; j++) {
      // [0,
      //  0,
      //  0,
      //  0];
      // make not zero tiles to be zero
      grids[lineFilledTiles[j].row][lineFilledTiles[j].column] = 0;
      // [2,
      //  4,
      //  0,
      //  0];
      grids[j][i] = lineFilledTiles[j].value;
    }
  }
  LOG && window.console.log(state.grids, "grids");
  transferGridsToTiles(state, grids);
};

export const tilesSlideDown = (state) => {
  const filledTiles = getFilledTiles(state);
  const [row, column] = state.boardSize;
  let grids = state.grids;
  let lineFilledTiles = [];
  // [0,    [0,
  //  2, ->  0,
  //  0,     2,
  //  4],    4]
  for (let i = 0; i < column; i++) {
    lineFilledTiles = filledTiles
      .filter(function(item) {
        return item.column === i;
      })
      .reverse();
    for (let j = 0; j < lineFilledTiles.length; j++) {
      grids[lineFilledTiles[j].row][lineFilledTiles[j].column] = 0;
      // [3][0];
      // [2][0];
      grids[row - 1 - j][i] = lineFilledTiles[j].value;
    }
  }
  LOG && window.console.log(state.grids, "grids");
  transferGridsToTiles(state, grids);
};

export const tilesSlideLeft = (state) => {
  const filledTiles = getFilledTiles(state);
  // LOG && window.console.log(filledTiles, "filledTiles");
  const [row] = state.boardSize;
  let grids = state.grids;
  let lineFilledTiles = [];
  for (let i = 0; i < row; i++) {
    // for example: the first row is [0, 2, 0, 4], find the tiles is not 0
    lineFilledTiles = filledTiles.filter(function(item) {
      return item.row === i;
    });
    // {row: 0, column: 1, value: 2}
    // {row: 0, column: 3, value: 4}
    for (let j = 0; j < lineFilledTiles.length; j++) {
      // [0, 0, 0, 0];
      grids[lineFilledTiles[j].row][lineFilledTiles[j].column] = 0;
      // [2, 4, 0, 0];
      grids[i][j] = lineFilledTiles[j].value;
    }
  }
  LOG && window.console.log(state.grids, "grids");
  transferGridsToTiles(state, grids);
};

export const tilesSlideRight = (state) => {
  const filledTiles = getFilledTiles(state);
  // LOG && window.console.log(filledTiles, "filledTiles");
  const [row, column] = state.boardSize;
  let grids = state.grids;
  let lineFilledTiles = [];
  for (let i = 0; i < row; i++) {
    // for example: the first row is [0, 2, 0, 4], find the tiles is not 0
    lineFilledTiles = filledTiles
      .filter(function(item) {
        return item.row === i;
      })
      .reverse();
    // {row: 0, column: 3, value: 4}
    // {row: 0, column: 1, value: 2}
    // LOG && window.console.log(lineFilledTiles, "lineFilledTiles");
    for (let j = 0; j < lineFilledTiles.length; j++) {
      // [0, 0, 0, 0];
      grids[lineFilledTiles[j].row][lineFilledTiles[j].column] = 0;
      // [0, 0, 2, 4];
      grids[i][column - 1 - j] = lineFilledTiles[j].value;
    }
  }
  LOG && window.console.log(state.grids, "grids");
  transferGridsToTiles(state, grids);
};

// If two tiles of the same number collide while moving,
// they will merge into a tile with the total value of the two tiles that collided.
// The resulting tile cannot merge with another tile again in the same move
// [4, 2, 2, 0] -> [4, 4, 0, 0]
// If a move causes three consecutive tiles of the same value to slide together,
// only the two tiles farthest along the direction of motion will combine.
// [2, 2, 2, 0] -> [4, 0, 2, 0]
// If all four spaces in a row or column are filled with tiles of the same value,
// a move parallel to that row/column will combine the first two and last two.
// [2, 2, 2, 2] -> [4, 0, 4, 0]
export const mergeCollidedTilesForUpMove = (state) => {
  state.isCollided = false;
  const [row, column] = state.boardSize;
  let grids = state.grids;
  for (let i = 0; i < column; i++) {
    for (let j = 0; j < row - 1; j++) {
      // if a tile is not zero and it is the same as the down neighbor, this tile multiple 2
      // increase current score here
      // the right neighbor becomes zero then
      // [2,     [4,
      //  2,  ->  0,
      //  4,      4,
      //  0]      0]
      // [0][0]
      // [1][0]
      // LOG && window.console.log(grids[j][i], j, i, "grid");
      // LOG && window.console.log(grids[j + 1][i], j, i, "grid");
      if (grids[j][i] > 0 && grids[j][i] === grids[j + 1][i]) {
        state.isCollided = true;
        grids[j][i] *= 2;
        increaseScore(state, grids[j][i]);
        grids[j + 1][i] = 0;
      }
    }
  }
  LOG && window.console.log(state.grids, "grids");
};

export const mergeCollidedTilesForDownMove = (state) => {
  state.isCollided = false;
  const [row, column] = state.boardSize;
  let grids = state.grids;
  // LOG && window.console.log(grids, "grid");
  for (let i = 0; i < column; i++) {
    for (let j = row - 1; j > 0; j--) {
      // if a tile is not zero and it is the same as the up neighbor, this tile multiple 2
      // increase current score here
      // the right neighbor becomes zero then
      // [2,     [0,
      //  2,  ->  4,
      //  4,      4,
      //  0]      0]
      // [3][0]
      // [2][0]
      // [1][0]
      // LOG && window.console.log(j, i, "grid");
      // LOG && window.console.log(grids[j][i], j, i, "grid");
      // LOG && window.console.log(grids[j - 1][i], j, i, "grid");
      if (grids[j][i] > 0 && grids[j][i] === grids[j - 1][i]) {
        state.isCollided = true;
        grids[j][i] *= 2;
        increaseScore(state, grids[j][i]);
        grids[j - 1][i] = 0;
      }
    }
  }
  LOG && window.console.log(state.grids, "grids");
};

export const mergeCollidedTilesForLeftMove = (state) => {
  state.isCollided = false;
  const [row, column] = state.boardSize;
  let grids = state.grids;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column - 1; j++) {
      // if a tile is not zero and it is the same as the right neighbor, this tile multiple 2
      // increase current score here
      // the right neighbor becomes zero then
      // [2, 2, 4, 0] -> [4, 0, 4, 0]
      if (grids[i][j] > 0 && grids[i][j] === grids[i][j + 1]) {
        state.isCollided = true;
        grids[i][j] *= 2;
        increaseScore(state, grids[i][j]);
        grids[i][j + 1] = 0;
      }
    }
    LOG && window.console.log(state.grids, "grids");
  }
};

export const mergeCollidedTilesForRightMove = (state) => {
  state.isCollided = false;
  const [row, column] = state.boardSize;
  let grids = state.grids;
  for (let i = 0; i < row; i++) {
    for (let j = column - 1; j > 0; j--) {
      // if a tile is not zero and it is the same as the right neighbor, this tile multiple 2
      // increase current score here
      // the right neighbor becomes zero then
      // [2, 2, 4, 0] -> [4, 0, 4, 0]
      // [0][3]
      // [0][2]
      // [0][1]
      if (grids[i][j] > 0 && grids[i][j] === grids[i][j - 1]) {
        state.isCollided = true;
        grids[i][j] *= 2;
        increaseScore(state, grids[i][j]);
        grids[i][j - 1] = 0;
      }
    }
    LOG && window.console.log(state.grids, "grids");
  }
};
