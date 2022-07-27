import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//公共的css文件
import "@/assets/css/common.css"
//引入font字体样式
import "@/assets/css/iconfont.css"
//淘宝无线适配文件
import '@/assets/js/flexible'

//引入ly-tab插件
import LyTab from 'ly-tab';
Vue.use(LyTab)
//引入vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
//全局引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
//解决双击放大的问题
import fastClick from 'fastclick'
fastClick.attach(document.body)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
