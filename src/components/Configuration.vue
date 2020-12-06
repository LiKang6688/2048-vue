<template>
  <div>
    <select-box
      :value="row"
      label="Row"
      info="Please select row amount"
      :minValue="3"
      :maxValue="6"
      :onChange="onChangeRow"
    />
    <select-box
      :value="column"
      label="Column"
      info="Please select column amount"
      :minValue="3"
      :maxValue="6"
      :onChange="onChangeColumn"
    />
    <select-box
      :value="goal"
      label="Goal"
      info="Please select goal"
      :minValue="3"
      :maxValue="12"
      :onChange="onChangeGoal"
    />
    <select-box
      :value="maxUndoSteps"
      label="Undo Steps"
      info="Please select undo steps amount"
      :minValue="1"
      :maxValue="4"
      :onChange="onChangeUndoSteps"
    />
  </div>
</template>

<script>
import SelectBox from "./SelectBox.vue";

export default {
  name: "Configuration",
  components: {
    SelectBox,
  },
  props: {
    initalTiles: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    row: null,
    column: null,
    goal: null,
  }),
  created() {
    this.row = this.$store.getters.row;
    this.column = this.$store.getters.column;
    this.goal = this.$store.getters.goal;
    this.maxUndoSteps = this.$store.getters.maxUndoSteps;
  },
  methods: {
    restartGame() {
      this.$store.dispatch("RestartGame").then(() => {
        for (let index = 0; index < this.initalTiles; index++) {
          this.$store.dispatch("GenerateOneRandomTile");
          if (index + 1 == this.initalTiles) this.$store.commit("addSteps");
        }
      });
    },
    onChangeRow(event) {
      const row = parseInt(event.target.value);
      window.console.log(row);
      this.$store.commit("setRow", row);
      this.restartGame();
    },
    onChangeColumn(event) {
      const column = parseInt(event.target.value);
      window.console.log(column);
      this.$store.commit("setColumn", column);
      this.restartGame();
    },
    onChangeGoal(event) {
      const goal = parseInt(event.target.value);
      window.console.log(goal);
      this.$store.commit("setWinValue", goal);
      this.restartGame();
    },
    onChangeUndoSteps(event) {
      const undoSteps = parseInt(event.target.value);
      window.console.log(undoSteps);
      this.$store.commit("setMaxUndoSteps", undoSteps);
      this.restartGame();
    },
  },
};
</script>


<style scoped>
select {
  width: 100%;
  width: 5em;
  border: 1px solid var(--select-border);
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1rem;
  height: 2.5em;
  cursor: pointer;
  line-height: 1.1;
  margin-right: 0.4em;
}
</style>