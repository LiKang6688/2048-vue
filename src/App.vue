<template>
  <div id="app">
    <div class="container" ref="container">
      <header-view class="header" :width="width" :initalTiles="initalTiles" />
      <game-view class="game-view" :width="width" :initalTiles="initalTiles" />
    </div>
  </div>
</template>

<script>
import HeaderView from "./View/HeaderView.vue";
import GameView from "./View/GameView.vue";
const LOG = window._env_.LOG;

export default {
  name: "App",
  components: {
    HeaderView,
    GameView,
  },
  data: () => ({
    width: 500,
    initalTiles: 2,
  }),
  mounted() {
    this.getContainerWidth();
  },
  methods: {
    getContainerWidth() {
      LOG && window.console.log(this.$refs.container.clientWidth, "width");
      this.width = this.$refs.container.clientWidth;
    },
  },
};
</script>

<style>
body {
  outline: none;
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  font-size: 100%;
  background-color: #faf8ef;
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  font-variant-ligatures: none;
  -webkit-font-variant-ligatures: none;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  touch-action: manipulation;
}
.container {
  color: #776e65;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 10px;
  height: 100%;
}
.header {
  margin-top: 4em;
}
button {
  font-weight: inherit;
  font-size: inherit;
  background: #8f7a66;
  border: none;
  border-radius: 3px;
  padding: 0 1.5em;
  text-decoration: none;
  color: #f9f6f2;
  height: 2.5em;
  line-height: 2.5em;
  margin-left: 1em;
  cursor: pointer;
}
button:disabled {
  background: #bbada0;
  cursor: unset;
}
.container {
  font-size: 16px;
}
@media screen and (max-width: 320px) {
  .container {
    font-size: 8px;
  }
}
@media screen and (min-width: 320px) and (max-width: 360px) {
  .container {
    font-size: 9px;
  }
}
@media screen and (min-width: 360px) and (max-width: 400px) {
  .container {
    font-size: 11px;
  }
}
@media screen and (min-width: 400px) and (max-width: 440px) {
  .container {
    font-size: 13px;
  }
}
@media screen and (min-width: 440px) and (max-width: 500px) {
  .container {
    font-size: 13px;
  }
}
@media screen and (min-width: 500px) {
  .container {
    font-size: 14px;
  }
}
.game-view {
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  position: relative;
}
</style>
