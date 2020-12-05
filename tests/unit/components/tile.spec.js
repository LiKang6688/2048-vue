import Vue from "vue";
import Vuex from "vuex";
import { should } from "chai";
import { shallowMount } from "@vue/test-utils";
import Tile from "@/components/Tile.vue";
import Store from "@/store";

Vue.use(Vuex);
const store = new Vuex.Store(Store);

describe("Tile.vue", () => {
  before(() => {
    should();
  });

  // describe("Store", () => {
  //   it("store is loaded", () => {
  //     const wrapper = shallowMount(Tile, { store });

  //   });
  // });

  it("renders props.tile when passed", () => {
    const tile = { row: 0, column: 0, value: 2 };
    const wrapper = shallowMount(Tile, {
      propsData: { tile },
      store,
    });
    wrapper.text().should.to.include(tile);
  });
});
