<template>
  <div v-if="data.value">
    <div class="tile" :class="[tileClass]" :style="tileStyle">
      <transition appear name="appear">
        <div class="value">
          {{ data.value }}
        </div>
      </transition>
    </div>
  </div>
  <div v-else class="tile" :style="tileStyle">
    <div class="value"></div>
  </div>
</template>

<script>
export default {
  name: "Tile",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    tileClass() {
      const { value } = this.data;
      return "tile-" + (value > 16384 ? "higher" : value);
    },
    tileStyle() {
      const [rowSize, columSzie] = this.$store.state.boardSize;
      const { row, column } = this.data;
      return {
        width: 100 / columSzie + "%",
        height: 100 / rowSize + "%",
        transform: `translate3d(${column * 100}%,${row * 100}%,0)`,
      };
    },
  },
};
</script>

<style scoped>
.tile {
  position: absolute;
  box-sizing: border-box;
  text-align: center;
  font-weight: bold;
  padding: 0.4em;
}
.value {
  transition-property: all;
  transition-duration: inherit;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f9f6f2;
  background-color: #ccc1b4;
}
.value.appear-enter-active {
  animation: zoomIn 160ms;
}
@keyframes zoomIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  75% {
    opacity: 1;
  }
}
.tile.tile-2 .value {
  color: #776e65;
  background: #eee4da;
  font-size: 5em;
}
.tile.tile-4 .value {
  color: #776e65;
  background: #ede0c8;
  font-size: 5em;
}
.tile.tile-8 .value {
  background: #f2b179;
  font-size: 5em;
}
.tile.tile-16 .value {
  background: #f59563;
  font-size: 4em;
}
.tile.tile-32 .value {
  background: #f67c5f;
  font-size: 4em;
}
.tile.tile-64 .value {
  background: #f65e3b;
  font-size: 4em;
}
.tile.tile-128 .value {
  background: #edcf72;
  font-size: 3em;
}
.tile.tile-256 .value {
  background: #edcc61;
  font-size: 3em;
}
.tile.tile-512 .value {
  background: #edc850;
  font-size: 3em;
}
.tile.tile-1024 .value {
  background: #edc53f;
  font-size: 2.5em;
}
.tile.tile-2048 .value {
  background: #edc22e;
  font-size: 2.5em;
}
.tile.tile-4096 .value {
  background: #00bcd4;
  font-size: 2.5em;
}
.tile.tile-8192 .value {
  background: #03a9f4;
  font-size: 2.5em;
}
.tile.tile-16384 .value {
  background: #1e88e5;
  font-size: 2em;
}
.tile.tile-higher .value {
  background: #3f51b5;
  font-size: 2em;
}
</style>