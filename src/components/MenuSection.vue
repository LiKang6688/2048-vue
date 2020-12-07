<template>
  <div>
    <button @click="restart">Restart</button>
    <button @click="undo" :disabled="undoStepsLength < 1">
      Undo ({{ undoStepsLength }})
    </button>
  </div>
</template>

<script>
export default {
  name: "MenuSection",
  props: {
    initalTiles: {
      type: Number,
      required: true,
    },
  },
  computed: {
    undoStepsLength() {
      return this.$store.getters.undoStepsLength;
    },
  },
  methods: {
    restart() {
      this.$store.dispatch("RestartGame").then(() => {
        for (let index = 0; index < this.initalTiles; index++) {
          this.$store.dispatch("GenerateOneRandomTile");
          if (index + 1 === this.initalTiles)
            this.$store.commit("addUndoSteps");
        }
      });
    },
    undo() {
      this.$store.dispatch("UndoSteps");
    },
  },
};
</script>
