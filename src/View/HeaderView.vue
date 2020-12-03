<template>
  <div>
    <h1>2048</h1>
    <score class="scores" :width="width" />
    <menu-section class="menu-section" :initalTiles="initalTiles" />
  </div>
</template>

<script>
import Score from "../components/Score.vue";
import MenuSection from "../components/MenuSection.vue";

export default {
  name: "HeaderView",
  components: {
    Score,
    MenuSection,
  },
  props: {
    initalTiles: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
  },
  data: () => ({}),
};
</script>

<style scoped>
h1 {
  font-size: 4.2em;
  margin: 0;
  display: inline-block;
}
.scores {
  float: right;
}
.menu-section {
  text-align: right;
  padding: 1.4em 0;
  font-size: 1em;
  white-space: nowrap;
}
</style>