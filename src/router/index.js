import Vue from "vue";
import Router from "vue-router";
import Sofa from "@/components/Sofa";
import Pillow from "@/components/Pillow";
import Cart from "@/components/Cart";
import Options from "@/components/Options";
import Output_order from "@/components/Output_order";
import Upload from "@/components/Upload";
import OptionDetail from "@/components/OptionDetail";

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: "/",
      name: "sofa",
      component: Sofa,
      props: {
        navTitle: "沙发类"
      }
    },
    {
      path: "/pillow",
      name: "pillow",
      component: Pillow,
      props: {
        navTitle: "垫子类"
      }
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
      props: {
        navTitle: "订单"
      }
    },
    {
      path: "/options",
      name: "options",
      component: Options,
      props: {
        navTitle: "选项设置"
      }
    },
    {
      path: "/Output_order",
      name: "Output_order",
      component: Output_order,
      props: {
        navTitle: "出货单"
      }
    },
    {
      path: "/Upload",
      name: "Upload",
      component: Upload
    },
    {
      path: "/OptionDetail",
      name: "OptionDetail",
      component: OptionDetail
    }
  ]
});
// router.beforeEach((to, from, next) => {})
// router.beforeResolve((to, from, next) => {})
// router.afterEach((to, from, next) => {})

export default router;
