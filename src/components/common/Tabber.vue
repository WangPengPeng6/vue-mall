<template>
  <div class="tabber">
    <ul>
      <li v-for="(item,index) in routerList" :key="index" @click="switchTab(item.path)">
        <img :src="$route.path==item.path?item.selected:item.active" alt="">
        <span :class="$route.path==item.path?'active':' '">{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tabber",
  data() {
    return {
      routerList:[
        {
          title:'首页',
          path:'/home',
          active:'/images/home.png',
          selected:'/images/home-select.png'
        },
        {
          title:'分类',
          path:'/list',
          active:'/images/list.png',
          selected:'/images/list-select.png'
        },
        {
          title:'购物车',
          path:'/cart',
          active:'/images/cart.png',
          selected:'/images/cart-select.png'
        },
        {
          title:'我的',
          path:'/main',
          active:'/images/main.png',
          selected:'/images/main-select.png'
        },
      ]
    }
  },
  methods:{
    switchTab(path){
      //判断是否点击的是同一个路由
      if(this.$route.path==path) return
      //路由跳转
      this.$router.push(path);
    }
  }
};
</script>

<style lang="less" scoped>
.tabber{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.6rem;
  background: #fff;
  // 手机浏览器访问，全屏模式不加
  // margin-bottom: 1.6rem;
  ul{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    li{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width: .8267rem;
        height: .8267rem;
      }
      span{

        font-size: .4267rem;
      }
    }
  }
}
.active{
  color: red;
}
</style>
