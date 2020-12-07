import Vue from "vue";
import Vuex from "vuex";
import { should, expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Tile from "@/components/Tile.vue";
import store from "@/store";

Vue.use(Vuex);

describe("Tile.vue", () => {
  before(() => {
    should();
  });

  it("renders props.tile when passed", () => {
    const data = { row: 0, column: 0, value: 2 };
    const wrapper = shallowMount(Tile, {
      propsData: { data },
      store,
    });

    wrapper.text().should.to.include(data.value);
  });

  describe("computed", () => {
    describe("tileClass", () => {
      it("should return tile-2 if tile.value is 2", () => {
        const localThis = {
          data: { row: 0, column: 0, value: 2 },
        };

        expect(Tile.computed.tileClass.call(localThis)).to.equal("tile-2");
      });
    });

    describe("tileStyle", () => {
      it("should return tile-2 if tile.value is 2", () => {
        const localThis = {
          data: { row: 0, column: 0, value: 2 },
          $store: store,
        };

        expect(Tile.computed.tileStyle.call(localThis)["transform"]).to.equal(
          "translate3d(0%,0%,0)"
        );
      });
    });
  });
});
