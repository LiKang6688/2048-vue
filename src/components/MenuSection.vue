<template>
  <div class="menus">
    <button @click="restart">Restart</button>
    <button @click="undo" :disabled="stepsLength < 1">
      Undo ({{ stepsLength }})
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
    stepsLength() {
      return this.$store.getters.stepsLength;
    },
  },
  methods: {
    restart() {
      this.$store.dispatch("RestartGame");
      for (let index = 0; index < this.initalTiles; index++)
        this.$store.dispatch("GenerateOneRandomTile");
      this.$store.commit("addSteps");
    },
    undo() {
      this.$store.dispatch("UndoSteps");
    },
  },
};
</script>
