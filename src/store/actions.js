const LOG = window._env_.LOG;

export const RestartGame = ({ commit, state }) => {
  return new Promise((resolve) => {
    commit("initGrids", state.boardSize);
    commit("setCurrentScore", 0);
    commit("setTiles", []);
    commit("setStatus", {
      gameEnd: false,
      win: false,
      gameOver: false,
      keepGoing: false,
    });
    commit("setUndoSteps", []);
    resolve();
  });
};

export const GenerateOneRandomTile = ({ commit, state }) => {
  // randomly generate a value of either 2 or 4.
  const random2_4 = () => {
    return Math.round(Math.random()) * 2 + 2;
  };
  const randomTile = (emptySpots) => {
    LOG && window.console.log(emptySpots, "emptySpots");
    if (emptySpots.length > 0) {
      const randomTile =
        emptySpots[Math.floor(Math.random() * emptySpots.length)];
      // LOG && window.console.log(randomTile, "randomTile");
      const randomValue = random2_4();
      // LOG && window.console.log(randomValue, "randomValue");
      commit("addNewTile", { randomTile, randomValue });
      commit("occupyGrid", { randomTile, randomValue });
    }
  };

  const [row, column] = state.boardSize;
  // LOG && window.console.log(row, column);
  const grids = state.grids;
  // LOG && window.console.log(grids, "grids");
  let emptySpots = [];
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < column; y++) {
      if (grids[x][y] === 0)
        //  find empty spots on the board
        emptySpots.push({
          x,
          y,
        });
      if (x === row - 1 && y === column - 1) {
        randomTile(emptySpots);
      }
    }
  }
};

export const keepGoing = ({ commit }) => {
  commit("setStatus", {
    gameEnd: false,
    win: false,
    gameOver: false,
    keepGoing: true,
  });
};

export const UndoSteps = ({ commit }) => {
  commit("undo");
};

export const TilesSlideUp = ({ commit }) => {
  return new Promise((resolve) => {
    commit("tilesSlideUp");
    commit("mergeCollidedTilesForUpMove");
    commit("tilesSlideUp");
    resolve();
  });
};

export const TilesSlideDown = ({ commit }) => {
  return new Promise((resolve) => {
    commit("tilesSlideDown");
    commit("mergeCollidedTilesForDownMove");
    commit("tilesSlideDown");
    resolve();
  });
};

export const TilesSlideLeft = ({ commit }) => {
  return new Promise((resolve) => {
    commit("tilesSlideLeft");
    commit("mergeCollidedTilesForLeftMove");
    commit("tilesSlideLeft");
    resolve();
  });
};

export const TilesSlideRight = ({ commit }) => {
  return new Promise((resolve) => {
    commit("tilesSlideRight");
    commit("mergeCollidedTilesForRightMove");
    commit("tilesSlideRight");
    resolve();
  });
};
