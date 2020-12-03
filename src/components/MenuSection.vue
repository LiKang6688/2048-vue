<template>
  <div class="menus">
    <button @click="restart">restart</button>
    <!-- <button @click="undo" :disabled="steps.length <= 1">
      undo({{ steps.length - 1 }})
    </button> -->
  </div>
</template>

<script>
export default {
  name: "MenuSection",
  data: () => ({
    // steps: [],
  }),
  props: {
    initalTiles: {
      type: Number,
      required: true,
    },
  },
  computed: {
    steps() {
      return this.$store.state.steps;
    },
  },
  methods: {
    restart() {
      this.$store.dispatch("RestartGame");
      for (let index = 0; index < this.initalTiles; index++)
        this.$store.dispatch("GenerateOneRandomTile");
    },
    // undo() {
    //   this.$store.dispatch("UndoSteps");
    // },
  },
};
</script>
