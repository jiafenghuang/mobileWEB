// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Axios from "axios";
Vue.config.productionTip = false;

import Mint from "mint-ui";
Vue.use(Mint);
/*
// 按需引入部分组件
import { Cell, Checklist } from 'mint-ui';
Vue.component(Cell.name, Cell);
Vue.component(Checklist.name, Checklist);
*/

Vue.prototype.$axios = Axios;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>"
});
