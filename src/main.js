import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

const initialState = localStorage.getItem("state");
if (initialState) store.commit("initialiseState", JSON.parse(initialState));

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
