<template>
  <div>
    <label for="standard-select">{{ label }}</label>
    <div>
      <select v-if="label != 'Goal'" :value="value" @change="onChange">
        <option disabled value="">{{ info }}</option>
        <option v-for="(value, index) in maxValue - minValue + 1" :key="index">
          {{ minValue + value - 1 }}
        </option>
      </select>
      <select v-else :value="value" @change="onChange">
        <option disabled value="">{{ info }}</option>
        <option v-for="(value, index) in maxValue - minValue + 1" :key="index">
          {{ Math.pow(2, minValue + value - 1) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectBox",
  props: {
    value: {
      type: Number,
      required: true,
    },
    onChange: {
      type: Function,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    minValue: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
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