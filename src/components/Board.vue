<template>
  <div>
    <div v-for="(row, rowIndex) in row" :key="rowIndex">
      <tile
        v-for="(column, columnIndex) in column"
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
    row() {
      return this.$store.getters.row;
    },
    column() {
      return this.$store.getters.column;
    },
  },
};
</script>