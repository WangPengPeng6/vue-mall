<template>
  <div id="app">
    <!-- keep-alive 实现缓存效果，提高性能 -->
    <!--要  缓存的路由-->
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      
      <!--不  缓存的路由-->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default{
  created(){
    this.$store.commit('INIT_USER')
  }
}
</script>
<style>
</style>
