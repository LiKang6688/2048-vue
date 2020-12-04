<template>
  <div v-if="status.gameEnd" :class="status">
    <div v-if="status.gameOver" class="text">Game over!</div>
    <div v-else-if="status.win" class="text">You win!</div>
    <div class="buttons">
      <button @click="tryAgain">Try again</button>
      <button v-if="status.win" @click="keepGoing">Keep going</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initalTiles: {
      type: Number,
      required: true,
    },
  },
  computed: {
    status() {
      return this.$store.state.status;
    },
  },
  methods: {
    tryAgain() {
      this.$emit("add-key-swipe");
      this.$store.dispatch("RestartGame").then(() => {
        for (let index = 0; index < this.initalTiles; index++) {
          this.$store.dispatch("GenerateOneRandomTile");
          if (index + 1 == this.initalTiles) this.$store.commit("addSteps");
        }
      });
    },
    // After reaching the 2048 tile,
    // players can continue to play (beyond the 2048 tile) to reach higher scores.
    keepGoing() {
      this.$emit("add-key-swipe");
      this.$store.dispatch("keepGoing", true);
    },
  },
};
</script>

<style scoped>
.win:not(.gameover) {
  background: rgba(237, 194, 46, 0.5);
  color: #f9f6f2;
}
.text {
  font-size: 2em;
  text-align: center;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
</style>