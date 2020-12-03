<template>
  <div class="scores">
    <div class="score" :style="scoreStyle">
      <div class="name">SCORE</div>
      <div class="value">{{ currentScore }}</div>
    </div>
    <div class="score" :style="scoreStyle">
      <div class="name">BEST SCORE</div>
      <div class="value">{{ bestScore }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Score",
  props: {
    width: {
      type: Number,
      required: true,
    },
  },
  data: () => ({}),
  computed: {
    currentScore() {
      return this.$store.state.stats.currentScore;
    },
    bestScore() {
      return this.$store.state.stats.bestScore;
    },
    scoreStyle() {
      return { width: this.width / 5 + "px" };
    },
  },
};
</script>

<style scoped>
.score {
  padding: 0.4em 0.4em;
  position: relative;
  display: inline-block;
  background: #bbada0;
  font-weight: bold;
  border-radius: 3px;
  color: white;
  margin-top: 1.4em;
  margin-left: 0.8em;
  text-align: center;
}
.score .name {
  font-size: 1em;
  color: #eee4da;
}
.score .value {
  font-size: 1.5em;
}
</style>