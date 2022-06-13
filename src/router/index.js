import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    //首页
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    //分类
    path: "/list",
    name: "List",
    component: () => import("../views/ListView.vue"),
  },
  {
    //购物车
    path: "/cart",
    name: "Cart",
    component: () => import("../views/CartView.vue"),
  },
  {
    //我的
    path: "/main",
    name: "Main",
    component: () => import("../views/MainView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
