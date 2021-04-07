import Vue, { VNode } from "vue";
import App from "./App.vue";
import router from "./router";

import "./bootstrap";
import "./store"

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h): VNode => h(App)
}).$mount("#app");
