<template>
  <div class="home">
    <div class="headers">
      <div class="headers-main">
        <Header/>
        <ly-tabs v-model="value" :activeColor="activeColor" @change="changeTab">
          <ly-tab-item  v-for='(item,index) in topBar' :key='index' :name="item.id" :title="item.label" />
        </ly-tabs>
      </div>
    </div>
    <section class="wrapper">
      <div>
        <div v-for="(item,index) in newData" :key="index">
          <Swiper v-if="item.type=='swiperList'" :swiperList="item.data"/>
          <Icons v-if="item.type=='iconsList'" :iconsList="item.data" />
          <Recommed v-if="item.type=='recommendList'" :recommendList="item.data" />
          <Womenswear v-if="item.type=='womenswearList'" :womenswearList="item.data"  />
          <Like v-if="item.type=='likeList'" :likeList="item.data" /> 
        </div>
      </div>
    </section>

    <Tabber />
  </div>
</template>

<script>
import Tabber from '@/components/common/Tabber.vue'
import Header from '@/components/home/Header.vue'
import Swiper from '@/components/home/Swiper.vue'
import Icons from "@/components/home/Icons.vue"
import Recommed from '@/components/home/Recommend.vue'
import Like from '@/components/home/Like.vue'
import Womenswear from '@/components/home/Womenswear.vue'

//引入插件
import BetterScroll from 'better-scroll'

//引入封装的axios
import request from '@/api/requset'
export default {
  name: "HomeView",
    data() {
    return  {
      value: 0,
      activeColor:'#b0352f',
      topBar:[],
      newData:[],
      recommendList:[],
    }
  },
  components:{
    Tabber,
    Header,
    Swiper,
    Icons,
    Recommed,
    Like,
    Womenswear
  },
  created() {
    this.getData()
    
  },
  mounted() {
     
  },
  methods:{
    changeTab(index){
     this.clickData(index)
    },
    async getData(){
      let res= await request.$axios({
        url: '/api/index_list/0/data/1'
      });
      this.topBar=Object.freeze(res.topBar);
      this.newData=Object.freeze(res.data);
      //当所有DOM节点加载完毕后执行 $nextTick
        this.$nextTick(()=>{
          new BetterScroll('.wrapper', {
          movable: true,
          zoom: true,
          click:true
        })
      })
    },
    async clickData(index){
      let res= await request.$axios({
        url: '/api/index_list/'+index+'/data/1'
      });
      if(res.constructor!=Array){
        this.newData=res.data
      }else{
        this.newData=res
      }
      //当所有DOM节点加载完毕后执行 $nextTick
       this.$nextTick(()=>{
          new BetterScroll('.wrapper', {
          movable: true,
          zoom: true
        })
      })
    },
  }
}
</script>

<style lang="less" scoped>
.home{
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  flex: 1;
  .headers{
    width: 100%;
    height: 2.4rem;
    .headers-main{
      position: fixed;
      width: 100%;
      top:0;
      left: 0;
    }
  }
  section{
    margin-top: .1333rem;
    flex: 1;
    overflow: hidden;
  }
}
.ly-tabs{
  width: 100vw;
  height: 1.0667rem;
  color: black;
}
</style>
