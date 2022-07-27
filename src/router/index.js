import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

/*解决路由版本报错问题*/
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

const routes = [
  {
    //重定向
    path: "/",
    redirect: '/home'
  },
  {
    //首页
    path: "/home",
    name: "home",
    meta: {
      keepAlive: true
    },
    component: Home,
  },
  {
    //分类
    path: "/list",
    name: "List",
    component: () => import("../views/List.vue"),
  },
  {
    //购物车
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    //我的
    path: "/main",
    name: "Main",
    component: () => import("../views/Main.vue"),
  },
  {
    //搜索
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
    children: [
      {
        path: "/",
        name: 'SearchIndex',
        component: () => import("../views/Search/Searchindex.vue"),
      },
      {
        path: "searchList",
        name: 'SearchList',
        component: () => import("../views/Search/SearchList.vue"),
      },
    ]
  },
  {
    //详情
    path: "/detail",
    name: "Detail",
    meta: {
      keepAlive: false
    },
    component: () =>
      import("../views/Detail.vue"),
  },
  {
    //验证码登录
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/login/Login.vue"),
  },
  {
    //密码登录
    path: "/userLogin",
    name: "UserLogin",
    component: () =>
      import("../views/login/UserLogin.vue"),
  },
  {
    //注册
    path: "/register",
    name: "Register",
    component: () =>
      import("../views/login/Register.vue"),
  },
  {
    //找回密码
    path: "/recovery",
    name: "Recovery",
    children: [
      {
        path: "/",
        name: "index",
        component: () =>
          import("../views/recovery/RecoveryIndex.vue"),
      },
      {
        path: "btn",
        name: "btn",
        component: () =>
          import("../views/recovery/RecoveryBtn.vue"),
      }
    ],
    component: () =>
      import("../views/Search.vue"),
  },
  {
    //地址
    path: "/path",
    name: "Path",
    children: [
      {
        path: "/",
        name: "pathIndex",
        component: () =>
          import("../views/path/Path-Index.vue"),
      },
      {
        path: "path-list",
        name: "path-list",
        component: () =>
          import("../views/path/Path-List.vue"),
      },
    ],
    component: () =>
      import("../views/Path.vue"),
  },
  {
    //结算页
    path: "/order",
    name: "Order",
    meta: {
      keepAlive: true
    },
    component: () =>
      import("../views/Order.vue"),
  },
  {
    //支付完成
    path: "/payment",
    name: "Payment",
    component: () =>
      import("../views/Payment.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//路由拦截
router.beforeEach((to, from, next) => {
  //需要验证的页面
  let nextRouter = ['Payment', 'Cart', 'Path', 'Order', 'pathIndex', 'path-list', 'Detail']
  //是否为登录状态
  let userInfo = JSON.parse(localStorage.getItem('vue-mallUserInfo'))
  //判断当前进入的页面是不是需要验证的页面
  if (nextRouter.indexOf(to.name) >= 0) {
    if (!userInfo) {
      router.push('/login')
    }
  }
  next()
})

export default router;
