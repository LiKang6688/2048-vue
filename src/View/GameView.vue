<template>
  <div>
    <game-end class="game-end" :initalTiles="initalTiles" />
    <game
      ref="game"
      class="game-board"
      :style="gameViewStyle"
      :initalTiles="initalTiles"
    />
  </div>
</template>

<script>
import Game from "../components/Game.vue";
import GameEnd from "../components/GameEnd.vue";

export default {
  name: "GameView",
  components: {
    Game,
    GameEnd,
  },
  props: {
    initalTiles: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
  },
  computed: {
    gameViewStyle() {
      return {
        width: this.width - 20 + "px",
        height: this.width - 20 + "px",
      };
    },
  },
};
</script>

<style scoped>
.game-end {
  border-radius: 5px;
  background: red;
  position: absolute;
  margin: -0.4em;
  width: calc(100% + 0.8em);
  height: calc(100% + 0.8em);
  z-index: 99999999;
  font-size: inherit;
  background: rgba(238, 228, 218, 0.73);
  text-align: center;
}
.game-board {
  border: solid 0.4em #bbad9f;
  box-sizing: border-box;
  position: relative;
  background: #bbad9f;
  border-radius: 5px;
}
</style>