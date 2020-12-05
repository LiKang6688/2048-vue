import { expect } from "chai";
import { row } from "@/store/getters";

describe("store - getters", () => {
  it("row", () => {
    // mock state
    const state = {
      boardSize: [3, 5],
    };
    // get the result from the getter
    const result = row(state);
    // assert the result
    expect(result).to.equal(state.boardSize[0]);
  });
});
