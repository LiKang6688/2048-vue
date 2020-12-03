<template>
  <div>
    <div v-for="(row, rowIndex) in boardSize[0]" :key="rowIndex">
      <tile
        v-for="(column, columnIndex) in boardSize[1]"
        :key="columnIndex"
        :data="{ row: row - 1, column: column - 1 }"
      />
    </div>
  </div>
</template>

<script>
import Tile from "./Tile.vue";

export default {
  name: "Board",
  components: {
    Tile,
  },
  computed: {
    boardSize() {
      return this.$store.state.boardSize;
    },
  },
};
</script>