import { expect } from "chai";
import { initGrids, tilesSlideUp } from "@/store/mutations";

describe("store - mutations", () => {
  describe("initGrids", () => {
    it("initGrids - 4, 4", () => {
      const gris = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      // mock state
      const state = { boardSize: [4, 4] };
      // apply mutation
      initGrids(state, state.boardSize);
      // assert result
      expect(state.grids).to.eql(gris);
    });

    it("initGrids - 3, 5", () => {
      const gris = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      // mock state
      const state = { boardSize: [3, 5] };
      // apply mutation
      initGrids(state, state.boardSize);
      // assert result
      expect(state.grids).to.eql(gris);
    });
  });

  it("tilesSlideUp", () => {
    let tiles = [
      { row: 0, column: 0, value: 2 },
      { row: 0, column: 1, value: 2 },
      { row: 0, column: 2, value: 4 },
      { row: 0, column: 3, value: 2 },
      { row: 1, column: 0, value: 4 },
      { row: 1, column: 1, value: 2 },
      { row: 1, column: 2, value: 2 },
      { row: 2, column: 1, value: 4 },
    ];
    // mock state
    let currentState = {
      grids: [
        [0, 0, 0, 0],
        [2, 2, 0, 0],
        [0, 2, 4, 0],
        [4, 4, 2, 2],
      ],
      boardSize: [4, 4],
    };
    // apply mutation
    tilesSlideUp(currentState);
    // assert result
    expect(currentState.tiles).to.eql(tiles);
  });
});
