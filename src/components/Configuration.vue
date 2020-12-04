<template>
  <div>
    <div>
      <label for="standard-select">Row</label>
      <div>
        <select v-model="row" @change="onChangeRow($event)">
          <option disabled value="">Please select row amount</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
      </div>
    </div>
    <div>
      <label for="standard-select">Column</label>
      <div>
        <select v-model="column" @change="onChangeColumn($event)">
          <option disabled value="">Please select column amount</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
      </div>
    </div>
    <div>
      <label for="standard-select">Goal</label>
      <div>
        <select v-model="goal" @change="onChangeGoal($event)">
          <option disabled value="">Please select Goal</option>
          <option>64</option>
          <option>128</option>
          <option>256</option>
          <option>512</option>
          <option>1024</option>
          <option>2048</option>
          <option>4096</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Configuration",
  computed: {
    row() {
      return this.$store.getters.row;
    },
    column() {
      return this.$store.getters.column;
    },
    goal() {
      return this.$store.getters.goal;
    },
  },
  methods: {
    onChangeRow(event) {
      const row = event.target.value;
      this.commit("setRow", row);
    },
    onChangeColumn(event) {
      const column = event.target.value;
      this.commit("setColumn", column);
    },
    onChangeGoal(event) {
      const goal = event.target.value;
      this.commit("setWinValue", goal);
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