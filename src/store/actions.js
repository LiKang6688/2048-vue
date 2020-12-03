const LOG = window._env_.LOG;

export const RestartGame = ({ commit }) => {
  commit("initGrids");
  commit("setCurrentScore", 0);
  commit("setTiles", []);
  commit("setStatus", {
    gameEnd: false,
    win: false,
    gameOver: false,
    keepGoing: false,
  });
};

export const GenerateOneRandomTile = ({ commit, state }) => {
  // randomly generate a value of either 2 or 4.
  const random2_4 = () => {
    return Math.round(Math.random()) * 2 + 2;
  };
  //  find empty spots on the board
  const findEmptySpots = () => {
    const [row, column] = state.boardSize;
    const grids = state.grids;
    let emptySpots = [];
    for (let x = 0; x < row; x++) {
      for (let y = 0; y < column; y++) {
        if (grids[x][y] === 0)
          emptySpots.push({
            x,
            y,
          });
      }
    }
    return emptySpots;
  };

  const emptySpots = findEmptySpots();
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

export const keepGoing = ({ commit }) => {
  commit("setStatus", {
    gameEnd: false,
    win: false,
    gameOver: false,
    keepGoing: true,
  });
};

// export const UndoSteps = ({ commit }) => {};

export const TilesSlideUp = ({ commit }) => {
  commit("tilesSlideUp");
  commit("mergeCollidedTilesForUpMove");
  commit("tilesSlideUp");
};

export const TilesSlideDown = ({ commit }) => {
  commit("tilesSlideDown");
  commit("mergeCollidedTilesForDownMove");
  commit("tilesSlideDown");
};

export const TilesSlideLeft = ({ commit }) => {
  commit("tilesSlideLeft");
  commit("mergeCollidedTilesForLeftMove");
  commit("tilesSlideLeft");
};

export const TilesSlideRight = ({ commit }) => {
  commit("tilesSlideRight");
  commit("mergeCollidedTilesForRightMove");
  commit("tilesSlideRight");
};
