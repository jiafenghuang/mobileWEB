// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Moment from "moment";
import Axios from "./initAxios/initAxios";
// import Axios from "axios";
// Axios.defaults.baseURL = 'https://www.shangcongxuan.cn/sofa/api/fetch';
import Qs from "qs";
Vue.config.productionTip = false;
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);
/*
// 按需引入部分组件
*/
// 注册全局过滤器
// Vue.filter("fullTime", function(value) {
//   console.log("value :", value);
//   return Moment(value).format("YYYY MM DD, HH:mm");
// });
import { Toast } from "vant";

Vue.use(Toast);
Vue.prototype.$axios = Axios;
Vue.prototype.$Qs = Qs;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>"
});
